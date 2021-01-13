import React, { useEffect } from 'react';

let $ = undefined;
let interval = undefined;
let selectId = Math.random();
selectId = selectId.toString().replace(".", "_");

const SelectableDropDown = ({ data, label, itemKey, stateKey, onChange, valueKeys, search, multiple, searchParams }) => {

    const setJquery = () => {
        interval = setInterval(() => {
            if (window.$ && data.length > 0) {
                clearInterval(interval)
                $ = window.$;
                sync();
            }
        }, 1000);
    }

    useEffect(() => {
        // console.log(data)
        setJquery();
    }, [data]);

    const sync = () => {
        var select = $(`#custom_select_${selectId}`);

        if (select.length) {
            select.each(function () {
                $(this).selectpicker({
                    style: '',
                    styleBase: 'form-control',
                    tickIcon: 'icofont-check-alt'
                });
            });
        }
    }

    const generatePath = (item, keys) => {
        let returnString = "";

        keys.forEach((element, index) => {
            let value = item[element];
            if (index === keys.length - 1) {
                returnString = returnString.concat(value);
            }
            else {
                returnString = returnString.concat(value + "#");
            }
        });

        return returnString;
    }

    return (
        <>
            <div className="form-group">
                <label>{label}</label>

                <select className="rounded form-control"
                    id={`custom_select_${selectId}`}
                    data-live-search={search ? "true" : "false"}
                    onChange={(e) => onChange(stateKey, e)}
                    multiple={multiple && "multiple"}
                >
                    <option disabled selected="true" value="">
                        {/** added loading this.state to the form */}
                        {
                            // data
                            (data.length > 0 ? `Select ${label}` : 'No Service Categories Found')
                            // : 'Loading...'
                        }
                    </option>,

                    {
                        data.map((item, index) => {
                            return <option data-tokens={searchParams ? searchParams.map((key) => (item[key] + " ")) : valueKeys.map((key) => (item[key] + " "))} key={index}
                                value={itemKey.length > 1 ?
                                    generatePath(item, itemKey)
                                    // item[itemKey.join["#"]]
                                    : item[itemKey]}>
                                {
                                    valueKeys.map((key) => (item[key] + " "))
                                }
                            </option>
                        })
                    }
                </select>
            </div>
        </>
    )
}

export { SelectableDropDown };