using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarFleet.Data.Auth
{
    public class AuthData
    {
        public string Token { get; set; }
        public long TokenExpirationTime { get; set; }
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public bool isAdmin { get; set; }
    }
}
