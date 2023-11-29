using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPP.Models;

namespace WebAPP.Services
{
    public interface IMyDataService
    {
        Task<IEnumerable<MyDataModel>> GetDataForTeacher(string teacherId);
        IEnumerable<MyDataModel> GetDataById(int id);
    }
}
