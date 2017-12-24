using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace Samsara.Controllers
{
    [Route("api/[controller]")]
    public class KanbanController : Controller
    {
        private static string[] Summaries = new[]
        {
            "Stuff", "Things", "Junk", "Tasks", "Chores", "Hooplah", "Items", "Actions"
        };

        [HttpGet("[action]")]
        public IEnumerable<Column> Columns()
        {
            return Enumerable.Range(1, 5).Select(index => new Column
            {
                Name = $"Column {index}"
            });
        }

        [HttpGet("[action]")]
        public IEnumerable<Story> Stories()
        {
            var rng = new Random();
            
            return Enumerable.Range(1, rng.Next(3, 10)).Select(index => {
                int id = rng.Next(0, Int32.MaxValue);
                return new Story
                {
                    Id = id,
                    Name = $"Task #{id}",
                    Summary = Summaries[rng.Next(Summaries.Length)]
                };
            });
        }

        //[HttpGet("[action]/{id?}")]
        //public Story StoryDetails(int id)
        //{
        //    var rng = new Random();
        //    return new Story
        //    {
        //        Id = id,
        //        Name = $"Task #{id}",
        //        Summary = Summaries[rng.Next(Summaries.Length)]
        //    };
        //}

        public class Column
        {
            public string Name { get; set; }
        }

        public class Story
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public string Summary { get; set; }
        }
    }
}
