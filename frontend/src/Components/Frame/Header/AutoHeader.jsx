import React from 'react';
import {Link} from 'react-router-dom';

/** 
 * Header component
 * -  headerClassName: string - tailwindcss class for header
 * -  fields: array - array of react components or html elements containing field name and value
 *  - to: string - path to navigate to when clicked
 *  - component: react component - react component to be displayed in the header
 *  - value: string - value to be displayed in the header
 */

export default function Header({
  className=defaultHeaderClassName,
  fields=[],  
}) {
  return (
    <header className={className}>
      {fields && fields.map((field, index) => (
        <Link key={'a_' + index} to={field.to} className={field.className? field.className : defaultFiledTextCalssName}>{field.component}</Link>
      ))}
    </header>
  )
}

export const defaultHeaderClassName = 'flex pt-8 justify-around items-center text-white';

export const defaultFiledTextCalssName = 'text-white hover:text-quaternary-blue hover:underline';

export const defaultFiledDomClassName = `${defaultFiledTextCalssName} flex items-center justify-center`;