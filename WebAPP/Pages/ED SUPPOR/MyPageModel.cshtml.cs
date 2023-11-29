using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.RazorPages;
using WebAPP.Models;
using WebAPP.Services;
using System.Collections.Generic;

namespace WebAPP.Pages
{
    [Authorize]
    public class MyPageModel : PageModel
    {
        private readonly IMyDataService _dataService;

        public MyPageModel(IMyDataService dataService)
        {
            _dataService = dataService;
        }

        public IEnumerable<MyDataModel> Data { get; private set; }

        public void OnGet(int? id)
        {
            // OnGet implementation...
        }
    }
}
