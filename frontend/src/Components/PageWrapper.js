import React from 'react'

export default function PageWrapper(props) {
    return (
        <main className="main-content">
        <div className="main-content-wrap">
          <div className="page-content">
            {props.children}
          </div>
        </div>
      </main>
    )
}
