using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace CommonHelper.AsyncExtension
{
    public static class AsyncExtension
    {

        public static TaskAwaiter<T[]> GetAwaiter<T>(this (Task<T>, Task<T>) tasks)
        {

            return TaskExt.WhenAll(tasks.Item1, tasks.Item2).GetAwaiter();
        }

    }
    public class TaskExt
    {
        public static async Task<T[]> WhenAll<T>(params Task<T>[] tasks)
        {
            var allTasks = Task.WhenAll(tasks);
            return await allTasks;
        }
    }

}
