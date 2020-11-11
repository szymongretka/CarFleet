using CarFleet.Data.BaseRepository;
using CarFleet.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarFleet.Data.Repository
{
    public class UserRepository : EntityBaseRepository<User>, IUserRepository
    {
        public UserRepository(FleetDBContext context) : base(context) { }

        public bool isEmailUniq(string email)
        {
            var user = this.GetSingle(u => u.Email == email);
            return user == null;
        }

        public bool IsUsernameUniq(string username)
        {
            var user = this.GetSingle(u => u.Username == username);
            return user == null;
        }
        public bool isUserAdmin(int id) 
        {
            var user = this.GetSingle(id);
            return user.isAdmin;
        }
    }
}
