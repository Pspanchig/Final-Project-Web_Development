using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPP.Models;
using WebAPP.Data;

namespace WebAPP.Services
{
    public class MyDataService : IMyDataService
    {
        private readonly ApplicationDbContext _context;

        public MyDataService(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<MyDataModel> GetDataById(int id)
        {
            var data = _context.MyDataModels
                               .Where(d => d.Id == id)
                               .ToList();

            return data;
        }

        public async Task<IEnumerable<MyDataModel>> GetDataForTeacher(string teacherId)
        {
            // Aquí va tu lógica para obtener los datos del profesor
            // Esto es solo un ejemplo y debe ser reemplazado con lógica real
            var fakeData = new List<MyDataModel>
            {
                new MyDataModel { /* inicializa las propiedades necesarias aquí */ }
            };

            return await Task.FromResult(fakeData);
        }
    }
}
