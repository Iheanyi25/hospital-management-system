using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HMS.Areas.Doctor.Interfaces;
using HMS.Areas.Pharmacy.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace HMS.Areas.Pharmacy.Controllers
{
    [Route("api/Pharmacy", Name = "Pharmacy - Dashboard")]
        [ApiController]
        public class DashboardController : Controller
        {

            private readonly IDrug _drug;
            private readonly IDrugInvoicing _drugInvoicing;
            private readonly IDoctorClerking _clerking;


            public DashboardController(IDrug drug, IDrugInvoicing drugInvoicing, IDoctorClerking clerking)
            {

                _drug = drug;
                _drugInvoicing = drugInvoicing;
                _clerking = clerking;

            }

            [Route("Dashboard")]
            [HttpGet]
            public async Task<IActionResult> GetSystemCount()
            {

                var drugCount = await _drug.GetDrugCount();
                var drugTabletCount = await _drug.GetTabletCount();
                var drugLiquidCount = await _drug.GetSyrupCount();
                var drugInhalerCount = await _drug.GetInhalerCount();
                var drugPowderCount = await _drug.GetPowderCount();
                var drugPrescriptionCount = await _clerking.DoctorPrescriptionCount();
                var drugInvoicesPaidNotDispensed = await _drugInvoicing.GetPaidDrugInvoiceNotDispensedCount();
                var drugPaidAndDispensedCount = await _drugInvoicing.GetPaidDrugInvoiceDispensedCount();

                return Ok(new
                {
                    drugCount,
                    drugTabletCount,
                    drugLiquidCount,
                    drugInhalerCount,
                    drugPowderCount,
                    drugPrescriptionCount,
                    drugInvoicesPaidNotDispensed,
                    drugPaidAndDispensedCount,
                    message = "Pharmacy Dashboard Counts"
                });
            }
        }
     
}
