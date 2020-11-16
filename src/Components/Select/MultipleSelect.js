import React, { useEffect } from 'react';

let $ = undefined;
let interval = undefined;
let selectBasic = Math.random();
selectBasic = selectBasic.toString().replace(".", "_");

const MultipleSelect = ({ data, showServices, label, itemKey, onChange, valueKey, notAvailableText }) => {

    useEffect(() => {
        console.log("the data from the useEffect", data)

        setJquery();
    }, [showServices, label, data]);

    const setJquery = async () => {
        interval = setInterval(() => {
            if (window.$ && data.length > 0) {
                clearInterval(interval)
                $ = window.$;
                sync();
            }
        }, 1000);
    }

    const sync = () => {
        var select = $(`#select_${selectBasic}`);

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

    const handleChangeThis = (e) => {
        onChange(`#select_${selectBasic}`, e);
        console.log(e)
        setJquery();
    }

    return (
        <div className="form-group">
            <label>{label}</label>

            {
                showServices ?
                    <div key={Math.random()}>

                        <select
                            className="rounded form-control"
                            multiple="multiple"
                            id={`select_${selectBasic}`}
                            onChange={(e) => { handleChangeThis(e); }}
                        // onChange={(e) => { onChange(e); }}
                        >
                            <option disabled value="">
                                {
                                    data.length > 0
                                        ? `Select ${label}`
                                        : 'Loading...'
                                }
                                {/** added loading this.state to the form ** */}
                            </option>
                            {

                                data.map((item, i) => (
                                    <option key={i} value={item[itemKey]}>
                                        {item[valueKey]}
                                        {/* valueKeys.map((key) => (item[key] + " ")) */}
                                    </option>
                                ))
                            }
                        </select>
                    </div>

                    :
                    <p>{notAvailableText}</p>
            }
        </div>

    )
}

export { MultipleSelect }