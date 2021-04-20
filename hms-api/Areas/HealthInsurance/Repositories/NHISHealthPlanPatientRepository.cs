using AutoMapper;
using HMS.Areas.HealthInsurance.Dtos;
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

namespace HMS.Areas.HealthInsurance.Repositories
{
    public class NHISHealthPlanPatientRepository : INHISHealthPlanPatient
    {
        private readonly ApplicationDbContext _applicationDbContext;
        private readonly IMapper _mapper;

        public NHISHealthPlanPatientRepository(ApplicationDbContext applicationDbContext, IMapper mapper)
        {
            _applicationDbContext = applicationDbContext;
            _mapper = mapper;
        }
        
        public async Task<bool> CreateNHISHealthPlanPatient(NHISHealthPlanPatient NHISHealthPlanPatient)
        {
            try
            {
                var NHISHealthPlan = await _applicationDbContext.NHISHealthPlans.Include(n => n.HealthPlan).Where(n => n.Id == NHISHealthPlanPatient.NHISHealthPlanId).FirstOrDefaultAsync();
                var patient = await _applicationDbContext.PatientProfiles.Include(p => p.Account).Where(p => p.PatientId == NHISHealthPlanPatient.PatientId).FirstOrDefaultAsync();
                var account = patient.Account;
                account.HealthPlanId = NHISHealthPlan.HealthPlanId;
                var HMOHealthPlanSubGroupPatient = await _applicationDbContext.HMOSubUserGroupPatients.Include(d => d.HMOSubUserGroup).Where(p => p.PatientId == patient.PatientId).FirstOrDefaultAsync();
                var HMOHealthPlanPatient = await _applicationDbContext.HMOHealthPlanPatients.Where(p => p.PatientId == patient.PatientId).Include(n => n.HMOHealthPlan).FirstOrDefaultAsync();

                if (NHISHealthPlanPatient == null)
                {
                    return false;
                }

                if (HMOHealthPlanSubGroupPatient != null)
                {
                    _applicationDbContext.HMOSubUserGroupPatients.Remove(HMOHealthPlanSubGroupPatient);
                }
                if (HMOHealthPlanPatient != null)
                {
                    _applicationDbContext.HMOHealthPlanPatients.Remove(HMOHealthPlanPatient);
                }



                _applicationDbContext.Accounts.Update(account);
               
                _applicationDbContext.NHISHealthPlanPatients.Add(NHISHealthPlanPatient);
                await _applicationDbContext.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public async Task<bool> CreateNHISSeondaryHealthPlanPatientService(NHISSecondaryHealthplanPatientService NHISHealthPlanPatient)
        {
            try
            {
                if (NHISHealthPlanPatient == null)
                {
                    return false;
                }

                _applicationDbContext.NHISSecondaryHealthplanPatientServices.Add(NHISHealthPlanPatient);

                await _applicationDbContext.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> DeleteHealthPlanPatient(NHISHealthPlanPatient NHISHealthPlanPatient)
        {
            try
            {
                if (NHISHealthPlanPatient == null)
                {
                    return false;
                }

                _applicationDbContext.NHISHealthPlanPatients.Remove(NHISHealthPlanPatient);
                await _applicationDbContext.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<NHISHealthPlanPatient> GetNHISHealthPlanPatient(string NHISHealthPlanId) => await _applicationDbContext.NHISHealthPlanPatients.Include(h => h.Patient).Where(h => h.Id == NHISHealthPlanId).FirstOrDefaultAsync();

        public async Task<int> GetNHISHealthPlanPatientCount(string NHISHealthPlanId) => await _applicationDbContext.NHISHealthPlanPatients.Where(h => h.NHISHealthPlanId == NHISHealthPlanId).CountAsync();


        public PagedList<PatientDtoForView> GetNHISHealthPlanPatients(string NHISHealthPlanId, PaginationParameter paginationParameter)
        {
            var patients = _applicationDbContext.NHISHealthPlanPatients.Include(h => h.Patient).Where(h => h.NHISHealthPlanId == NHISHealthPlanId).OrderBy(h => h.Patient.FirstName).ToList();
            var patientsToReturn = _mapper.Map<IEnumerable<PatientDtoForView>>(patients);
            return PagedList<PatientDtoForView>.ToPagedList(patientsToReturn.AsQueryable(), paginationParameter.PageNumber, paginationParameter.PageSize);
        } 
        
        public PagedList<PatientDtoForView> GetNHISHealthPlanPatients(PaginationParameter paginationParameter)
        {
            var patients = _applicationDbContext.NHISHealthPlanPatients.Include(h => h.Patient).OrderBy(h => h.Patient.FirstName).ToList();
            var patientsToReturn = _mapper.Map<IEnumerable<PatientDtoForView>>(patients);
            return PagedList<PatientDtoForView>.ToPagedList(patientsToReturn.AsQueryable(), paginationParameter.PageNumber, paginationParameter.PageSize);
        }

        public PagedList<NHISSecondaryHealthplanPatientServiceDtoForView> GetPatientSecondaryNHISServices(PaginationParameter paginationParameter)
        {
            var services = _applicationDbContext.NHISSecondaryHealthplanPatientServices.Include(h => h.Patient).Include(h => h.Service).ThenInclude(h => h.ServiceCategory).Include(h => h.NHISHealthPlan).OrderByDescending(h => h.DateCreated).ToList();
            var servicesToReturn = _mapper.Map<IEnumerable<NHISSecondaryHealthplanPatientServiceDtoForView>>(services);
            return PagedList<NHISSecondaryHealthplanPatientServiceDtoForView>.ToPagedList(servicesToReturn.AsQueryable(), paginationParameter.PageNumber, paginationParameter.PageSize);
        }

        public async Task<bool> UpdateNHISHealthPlanPatient(NHISHealthPlanPatient NHISHealthPlanPatient)
        {
            try
            {
                if (NHISHealthPlanPatient == null)
                {
                    return false;
                }

                _applicationDbContext.NHISHealthPlanPatients.Update(NHISHealthPlanPatient);
                await _applicationDbContext.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
