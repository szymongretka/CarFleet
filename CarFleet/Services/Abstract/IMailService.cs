using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarFleet.Services.Abstract
{
    public interface IMailService
    {
        public void sendMail();
        public void Print();
    }
}
