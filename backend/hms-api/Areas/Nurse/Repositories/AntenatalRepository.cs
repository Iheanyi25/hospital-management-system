
using AutoMapper;
using HMS.Areas.Nurse.Dtos;
using HMS.Areas.Nurse.Interfaces;
using HMS.Database;
using HMS.Models;
using HMS.Services.Helpers;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HMS.Areas.Nurse.Repositories
{
    public class AntenatalRepository : IAntenatal
    {
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _applicationDbContext;

        public AntenatalRepository(ApplicationDbContext applicationDbContext, IMapper mapper)
        {
            _applicationDbContext = applicationDbContext;
            _mapper = mapper;
        }
       
        public async Task<bool> CreateAntenatal(Antenatal antenatal)
        {
            try
            {
                if (antenatal == null)
                {
                    return false;
                }

                _applicationDbContext.Antenatals.Add(antenatal);
                await _applicationDbContext.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> UpdateAntenatal(Antenatal antenatal)
        {
            try
            {
                if (antenatal == null)
                {
                    return false;
                }

                _applicationDbContext.Antenatals.Update(antenatal);
                await _applicationDbContext.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<AntenatalDtoForView> GetAntenatal(string AntenatalId) 
        {
            var antenatal = await _applicationDbContext.Antenatals.Where(h => h.Id == AntenatalId).Include(a => a.Patient).FirstOrDefaultAsync();
            var AntenatalsToReturn = _mapper.Map<AntenatalDtoForView>(antenatal);
            return AntenatalsToReturn;
        }  

        public PagedList<AntenatalDtoForView> GetAntenatals(PaginationParameter paginationParameter)
        {
            var Antenatals = _applicationDbContext.Antenatals.Include(a => a.Patient).ToList();
            var AntenatalsToReturn = _mapper.Map<IEnumerable<AntenatalDtoForView>>(Antenatals);
            return PagedList<AntenatalDtoForView>.ToPagedList(AntenatalsToReturn.AsQueryable(), paginationParameter.PageNumber, paginationParameter.PageSize);
        }

        public async Task<AntenatalRecordDtoForView> GetAntenatalRecord(string AntenatalRecordId)
        {
            var antenatalRecord = await _applicationDbContext.AntenatalRecords.Where(h => h.Id == AntenatalRecordId).Include(a => a.Initiator).FirstOrDefaultAsync();
            var AntenatalRecordsToReturn = _mapper.Map<AntenatalRecordDtoForView>(antenatalRecord);
            return AntenatalRecordsToReturn;
        }

        public PagedList<AntenatalRecordDtoForView> GetAntenatalRecords(string AntenatalId, PaginationParameter paginationParameter)
        {
            var AntenatalRecords = _applicationDbContext.AntenatalRecords.Include(a => a.Initiator).Where(a => a.AntenatalId == AntenatalId).ToList();
            var AntenatalRecordsToReturn = _mapper.Map<IEnumerable<AntenatalRecordDtoForView>>(AntenatalRecords);
            return PagedList<AntenatalRecordDtoForView>.ToPagedList(AntenatalRecordsToReturn.AsQueryable(), paginationParameter.PageNumber, paginationParameter.PageSize);
        }

        public async Task<bool> CreateAntenatalRecord(AntenatalRecord antenatal)
        {
            try
            {
                if (antenatal == null)
                {
                    return false;
                }

                _applicationDbContext.AntenatalRecords.Add(antenatal);
                await _applicationDbContext.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> UpdateAntenatalRecord(AntenatalRecord antenatal)
        {
            try
            {
                if (antenatal == null)
                {
                    return false;
                }

                _applicationDbContext.AntenatalRecords.Update(antenatal);
                await _applicationDbContext.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IEnumerable<AntenatalRecordDtoForView>> GetAntenatalRecords(string AntenatalId)
        {
            var antenatalRecords = await _applicationDbContext.AntenatalRecords.Include(a => a.Initiator).Where(a => a.AntenatalId == AntenatalId).ToListAsync();
            var AntenatalRecordsToReturn = _mapper.Map<IEnumerable<AntenatalRecordDtoForView>>(antenatalRecords);
            return AntenatalRecordsToReturn;
        } 
    }
}
