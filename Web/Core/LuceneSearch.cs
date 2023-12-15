using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using Lucene.Net.Analysis.Standard;
using Lucene.Net.Documents;
using Lucene.Net.Index;
using Lucene.Net.QueryParsers;
using Lucene.Net.Search;
using Lucene.Net.Store;
using Version = Lucene.Net.Util.Version;
using System.Web.Hosting;
using Model.Entities;

namespace Web.Core
{
    public static class LuceneSearch
    {
        //todo: we will add required Lucene methods here, step-by-step...
        private static string _luceneDir = HostingEnvironment.MapPath("/Indexing");


        private static FSDirectory _directoryTemp;
        private static FSDirectory _directory
        {
            get
            {
                if (_directoryTemp == null) _directoryTemp = FSDirectory.Open(new DirectoryInfo(_luceneDir));
                if (IndexWriter.IsLocked(_directoryTemp)) IndexWriter.Unlock(_directoryTemp);
                var lockFilePath = Path.Combine(_luceneDir, "write.lock");
                if (File.Exists(lockFilePath)) File.Delete(lockFilePath);
                return _directoryTemp;
            }
        }
        private static void _addToLuceneIndex(SearchLuceneDto KhacHangData, IndexWriter writer)
        {
            // remove older index entry
            var searchQuery = new TermQuery(new Term("Id", KhacHangData.Id));
            writer.DeleteDocuments(searchQuery);

            // add new index entry
            var doc = new Document();

            // add lucene fields mapped to db fields
            doc.Add(new Field("Id", KhacHangData.Id, Field.Store.YES, Field.Index.NOT_ANALYZED));
            doc.Add(new Field("IdItem", KhacHangData.IdItem.ToString(), Field.Store.YES, Field.Index.NOT_ANALYZED));
            doc.Add(new Field("Title", KhacHangData.Title, Field.Store.YES, Field.Index.ANALYZED));
            doc.Add(new Field("Type", KhacHangData.Type, Field.Store.YES, Field.Index.ANALYZED));
            doc.Add(new Field("Description", KhacHangData.Description, Field.Store.YES, Field.Index.ANALYZED));
            doc.Add(new Field("Link", KhacHangData.Link, Field.Store.YES, Field.Index.ANALYZED));
            // add entry to index
            writer.AddDocument(doc);
        }
        public static void AddUpdateLuceneIndex(IEnumerable<SearchLuceneDto> sampleDatas)
        {
            // init lucene
            var analyzer = new StandardAnalyzer(Version.LUCENE_30);
            using (var writer = new IndexWriter(_directory, analyzer, IndexWriter.MaxFieldLength.UNLIMITED))
            {
                // add data to lucene search index (replaces older entry if any)
                foreach (var sampleData in sampleDatas) _addToLuceneIndex(sampleData, writer);

                // close handles
                analyzer.Close();
                writer.Dispose();
            }
        }
        public static void AddUpdateLuceneIndex(SearchLuceneDto sampleData)
        {
            try
            {
                AddUpdateLuceneIndex(new List<SearchLuceneDto> { sampleData });
            }
            catch (Exception ex)
            {

                
            }
          
        }
        public static void ClearLuceneIndexRecord(int record_id)
        {
            // init lucene
            var analyzer = new StandardAnalyzer(Version.LUCENE_30);
            using (var writer = new IndexWriter(_directory, analyzer, IndexWriter.MaxFieldLength.UNLIMITED))
            {
                // remove older index entry
                var searchQuery = new TermQuery(new Term("Id", record_id.ToString()));
                writer.DeleteDocuments(searchQuery);

                // close handles
                analyzer.Close();
                writer.Dispose();
            }
        }
        public static bool ClearLuceneIndex()
        {
            try
            {
                var analyzer = new StandardAnalyzer(Version.LUCENE_30);
                using (var writer = new IndexWriter(_directory, analyzer, true, IndexWriter.MaxFieldLength.UNLIMITED))
                {
                    // remove older index entries
                    writer.DeleteAll();

                    // close handles
                    analyzer.Close();
                    writer.Dispose();
                }
            }
            catch (Exception)
            {
                return false;
            }
            return true;
        }
        public static void Optimize()
        {
            var analyzer = new StandardAnalyzer(Version.LUCENE_30);
            using (var writer = new IndexWriter(_directory, analyzer, IndexWriter.MaxFieldLength.UNLIMITED))
            {
                analyzer.Close();
                writer.Optimize();
                writer.Dispose();
            }
        }
        private static SearchLuceneDto _mapLuceneDocumentToData(Document doc)
        {
            return new SearchLuceneDto
            {
                Id = doc.Get("Id"),
                IdItem = Convert.ToInt32(doc.Get("IdItem")),
                Title = doc.Get("Title"),
                Type = doc.Get("Type"),
                Description = doc.Get("Description"),
                Link = doc.Get("Link")
            };
        }
        private static IEnumerable<SearchLuceneDto> _mapLuceneToDataList(IEnumerable<Document> hits)
        {
            return hits.Select(_mapLuceneDocumentToData).ToList();
        }
        private static IEnumerable<SearchLuceneDto> _mapLuceneToDataList(IEnumerable<ScoreDoc> hits,
            IndexSearcher searcher)
        {
            return hits.Select(hit => _mapLuceneDocumentToData(searcher.Doc(hit.Doc))).ToList();
        }
        private static Query parseQuery(string searchQuery, QueryParser parser)
        {
            Query query;
            try
            {
                query = parser.Parse(searchQuery.Trim());
            }
            catch (ParseException)
            {
                query = parser.Parse(QueryParser.Escape(searchQuery.Trim()));
            }
            return query;
        }
        private static IEnumerable<SearchLuceneDto> _search
            (string searchQuery, string searchField = "")
        {
            // validation
            if (string.IsNullOrEmpty(searchQuery.Replace("*", "").Replace("?", ""))) return new List<SearchLuceneDto>();
            try
            {
                // set up lucene searcher
                using (var searcher = new IndexSearcher(_directory, false))
                {
                    var hits_limit = 1000;
                    var analyzer = new StandardAnalyzer(Version.LUCENE_30);

                    // search by single field
                    if (!string.IsNullOrEmpty(searchField))
                    {
                        var parser = new QueryParser(Version.LUCENE_30, searchField, analyzer);
                        var query = parseQuery(searchQuery, parser);
                        var hits = searcher.Search(query, hits_limit).ScoreDocs;
                        var results = _mapLuceneToDataList(hits, searcher);
                        analyzer.Close();
                        searcher.Dispose();
                        return results;
                    }
                    // search by multiple fields (ordered by RELEVANCE)
                    else
                    {
                        var parser = new MultiFieldQueryParser
                            (Version.LUCENE_30, new[] { "Id","IdItem", "Title", "Type", "Description", "Link" }, analyzer);
                        var query = parseQuery(searchQuery, parser);
                        var hits = searcher.Search
                            (query, null, hits_limit, Sort.RELEVANCE).ScoreDocs;
                        var results = _mapLuceneToDataList(hits, searcher);
                        analyzer.Close();
                        searcher.Dispose();
                        return results;
                    }
                }
            }
            catch (Exception)
            {
                return new List<SearchLuceneDto>();
            }

        }
        public static IEnumerable<SearchLuceneDto> Search(string input, string fieldName = "")
        {
            if (string.IsNullOrEmpty(input)) return new List<SearchLuceneDto>();

            var terms = input.Trim().Replace("-", " ").Split(' ')
                .Where(x => !string.IsNullOrEmpty(x)).Select(x => x.Trim() + "*");
            input = string.Join(" ", terms);

            return _search(input, fieldName);
        }
        public static IEnumerable<SearchLuceneDto> GetAllIndexRecords()
        {
            // validate search index
            if (!System.IO.Directory.EnumerateFiles(_luceneDir).Any()) return new List<SearchLuceneDto>();

            // set up lucene searcher
            var searcher = new IndexSearcher(_directory, false);
            var reader = IndexReader.Open(_directory, false);
            var docs = new List<Document>();
            var term = reader.TermDocs();
            while (term.Next()) docs.Add(searcher.Doc(term.Doc));
            reader.Dispose();
            searcher.Dispose();
            return _mapLuceneToDataList(docs);
        }

    }
    public class SearchLuceneDto
    {
        public string Id { get; set; }
        public long IdItem { get; set; }
        public string Title { get; set; }
        public string Type { get; set; }
       
        public string Description { get; set; }
        public string Link { get; set; }
    }
}
