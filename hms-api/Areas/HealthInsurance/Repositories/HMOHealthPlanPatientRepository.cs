using AutoMapper;
using HMS.Areas.HealthInsurance.Interfaces;
using HMS.Areas.Patient.Dtos;
using HMS.Database;
using HMS.Models;
using HMS.Services.Helpers;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HMS.Areas.NHIS.Repositories
{
    
   
    public class HMOHealthPlanPatientRepository : IHMOHealthPlanPatient
    {
        private readonly ApplicationDbContext _applicationDbContext;
        private readonly IMapper _mapper;

        public HMOHealthPlanPatientRepository(ApplicationDbContext applicationDbContext, IMapper mapper)
        {
            _applicationDbContext = applicationDbContext;
            _mapper = mapper;
        }
        public async Task<bool> CreateHMOHealthPlanPatient(HMOHealthPlanPatient HMOHealthPlanPatient)
        {
            try
            {
                var HMOHealthPlan = await _applicationDbContext.HMOHealthPlans.Include(n => n.HMO).ThenInclude(n => n.HealthPlan).Where(n => n.Id == HMOHealthPlanPatient.HMOHealthPlanId).FirstOrDefaultAsync();
                var patient = await _applicationDbContext.PatientProfiles.Include(p => p.Account).Where(p => p.PatientId == HMOHealthPlanPatient.PatientId).FirstOrDefaultAsync();
                var account = patient.Account;
                account.HealthPlanId = HMOHealthPlan.HMO.HealthPlanId;
                var HMOHealthPlanSubGroupPatient = await _applicationDbContext.HMOSubUserGroupPatients.Include(d => d.HMOSubUserGroup).Where(p => p.PatientId == patient.PatientId).FirstOrDefaultAsync();
                var NHISHealthPlanPatient = await _applicationDbContext.NHISHealthPlanPatients.Where(p => p.PatientId == patient.PatientId).Include(n => n.NHISHealthPlan).FirstOrDefaultAsync();

                if (HMOHealthPlanPatient == null)
                {
                    return false;
                }
               
                if (HMOHealthPlanSubGroupPatient != null)
                {
                    _applicationDbContext.HMOSubUserGroupPatients.Remove(HMOHealthPlanSubGroupPatient);
                }
                if (NHISHealthPlanPatient != null)
                {
                    _applicationDbContext.NHISHealthPlanPatients.Remove(NHISHealthPlanPatient);
                }

                

                _applicationDbContext.Accounts.Update(account);
                _applicationDbContext.HMOHealthPlanPatients.Add(HMOHealthPlanPatient);
                await _applicationDbContext.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> DeleteHMOHealthPlanPatient(HMOHealthPlanPatient PatientHMOHealthPlan)
        {
            try
            {
                if (PatientHMOHealthPlan == null)
                {
                    return false;
                }

                _applicationDbContext.HMOHealthPlanPatients.Remove(PatientHMOHealthPlan);
                await _applicationDbContext.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> GetHealthPlanPatientCount(string HMOHealthPlanId) => await _applicationDbContext.HMOHealthPlanPatients.Where(h => h.HMOHealthPlanId == HMOHealthPlanId).CountAsync();

        public async Task<HMOHealthPlanPatient> GetHMOHealthPlanPatient(string HMOHealthPlanPatientId) => await _applicationDbContext.HMOHealthPlanPatients.Include(h => h.Patient).Where(h => h.Id == HMOHealthPlanPatientId).FirstOrDefaultAsync();
       

        public PagedList<PatientDtoForView> GetHMOHealthPlanPatients(string HMOHealthPlanId, PaginationParameter paginationParameter)
        {
            var patients = _applicationDbContext.HMOHealthPlanPatients.Include(h => h.Patient).Where(h => h.HMOHealthPlanId == HMOHealthPlanId).OrderBy(dp => dp.Patient.FirstName).ToList();
            var patientsToReturn = _mapper.Map<IEnumerable<PatientDtoForView>>(patients);
            return PagedList<PatientDtoForView>.ToPagedList(patientsToReturn.AsQueryable(), paginationParameter.PageNumber, paginationParameter.PageSize);
        }
    }
}
