using Microsoft.EntityFrameworkCore;
using WebAPP.Models;

namespace WebAPP.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<MyDataModel> MyDataModels { get; set; } // Ensure this matches the name used in your service
    }
}
