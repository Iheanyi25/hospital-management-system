import React from 'react'

export default function SpinnerLoader() {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
          <div class="spinner-border text-primary" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
    )
}
