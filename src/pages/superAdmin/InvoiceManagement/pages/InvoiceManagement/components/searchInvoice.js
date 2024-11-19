import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import {
  AsyncMultiSelect,
  Button,
  Jumbotron,
} from "../../../../../../ui_elements";
import { getSearchRequest } from "../../../../../../api/apiCall";
import { getStudentsUrl } from "../../../../../../api/urls";
import { PAGESIZE, SEARCH_DELAY } from "../../../../../../utils/constants";
import { formatUserSearch } from "../../../../../../utils/formatUserSearch";
import { useDebouncedCallback } from "use-debounce";

export const schema = yup.object().shape({
  matricNo: yup.mixed().required("please select a student"),
});

export const SearchInvoice = ({ setMatricNo, isLoading }) => {
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const { matricNo } = data;
    setMatricNo(matricNo.value);
  };

  const fetchStudents = async (query) => {
    const data = await getSearchRequest({
      queryKey: getStudentsUrl({
        searchTerm: query,
        pageSize: PAGESIZE.sm,
      }),
    });
    return formatUserSearch({
      identification: "matricNumber",
      value: "userId",
      fullName: "fullName",
      users: data?.data.items,
    });
  };

  // Create a debounced version of fetchStudents
  const debouncedFetchStudents = useDebouncedCallback(
    fetchStudents,
    SEARCH_DELAY.sm
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Jumbotron
        headerText="Invoice Management"
        borderClasses="border-bottom-0"
        footerContent={
          <Button
            data-cy="fetch_details"
            type="submit"
            buttonClass="primary"
            label="View record"
            loading={isLoading}
          />
        }
        footerStyle="d-flex justify-content-end"
      >
        <section className="p-4">
          <div className="row">
            <div className=" col-md-6 row align-items-center">
              <div className="col-lg-3 align-items-center">
                <label className="font-weight-bold" htmlFor="subCategoryId">
                  Matric No.
                </label>
              </div>
              <div className="col-lg-9">
                <Controller
                  name="matricNo"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <AsyncMultiSelect
                      placeholder="Search by matric number/name"
                      id="matricNo"
                      apiOptions={debouncedFetchStudents}
                      isMulti={false}
                      isClearable
                      onChange={(data) =>
                        setValue("matricNo", data?.length > 0 ? data : null)
                      }
                      {...field}
                      isError={!!errors.matricNo}
                      errorText={
                        errors.matricNo && errors.matricNo.message
                      }
                      required
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </section>
      </Jumbotron>
    </form>
  );
};
