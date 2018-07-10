import React from "react"
import ReactHtmlParser from 'react-html-parser'

const Column = ({ text }) => <div className="">{ ReactHtmlParser(text) }</div>

const ColumnContainer = ({ columns }) => {
  const columnList = columns.map((column, i) => <Column key={i} text={column.text} />)
  return columnList
}

const Row = ({ columns }) =>
  <div className="">
    <ColumnContainer columns={columns} />
  </div>

const RowContainer = ({ rows }) => {
  const rowList = rows.map((row, i) => <Row key={i} columns={row.columns} />)
  return rowList;
}

const Section = ({ rows }) =>
  <div className="container">
    <RowContainer rows={rows} />
  </div>

const SectionContainer = ({ sections }) => {
  const sectionList = sections.map((section, i) =>
    <div key={i} className={['section', i === 0 ? 'section--hero' : 'section-content'].join(' ')}>
      <Section rows={section.rows} />
    </div>
  )
  return sectionList
}

export const Page = ({ content: { sections } }) =>
  <div className="page">
    <SectionContainer sections={sections} />
  </div> 
