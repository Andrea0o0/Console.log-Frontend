import React from 'react'

export default function SearchInput(props) {

  const { handleSearchKata } = props;

  const handleChange = (e) => {
    handleSearchKata(e.target.value)
  }

  return (
    <div>
      <input type="text" name="search" onChange={handleChange} placeholder="What are you looking for?" />
    </div>
  )
}