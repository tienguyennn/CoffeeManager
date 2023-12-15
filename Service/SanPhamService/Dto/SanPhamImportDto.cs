using Model.IdentityEntities;
using Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
namespace Service.SanPhamService.Dto
{
    public class SanPhamImportDto
    {
		[Required]
[DisplayName("Danh mục")]
public string DanhMucId { get; set; }
		[Required]
[DisplayName("Tên sản phẩm")]
public string Ten { get; set; }
		[Required]
[DisplayName("Giá")]
public decimal Gia { get; set; }

    }
}