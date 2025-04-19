import React from 'react'

const Header = ({ title, subtitle }: { title: string, subtitle?: string }) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
        {title}
      </h1>
      {/* <h1>akshay</h1> */}
      {subtitle && (
        <p className="mt-2 text-lg text-gray-600">
          {subtitle}
        </p>
      )}
    </div>
  )
}

export default Header
