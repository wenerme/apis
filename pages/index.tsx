import React from 'react'
function IndexPage({ pid }) {
  return (
    <div>
      <h2>Wener's API</h2>
      <a href="https://github.com/wenerme/wener">wenerme/wener</a>
    </div>
  )
}
IndexPage.getInitialProps = function () {
  return { pid: process.pid }
}
export default IndexPage
