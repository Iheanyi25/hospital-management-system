import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Page404() {

    return (
        <>
            <div className="h-100 bg_404 d-flex justify-content-center align-items-center text-cnter">
                <div className="wrapper_404 w-50 align-items-center">
                    <h2 className="text-center">404</h2>
                    <p className="text-center mb-4">
                        Sorry, the page you are looking for doesn't exist. Either it was removed, or you mistyped the link
</p>

                    <div class="text-center pt-5">
                        <button type="submit" class="btn btn-block btn-primary btn_404 p-3">Go to homepage</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export { Page404 };