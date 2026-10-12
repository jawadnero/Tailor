import React from 'react'
const shapes = {
 scissors:<><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.1 8.1 21 21M14 10l7-7M8.1 15.9 12 12"/></>,
 home:<><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="M9 21v-8h6v8"/></>,
 users:<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
 'user-plus':<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6m-3-3h6"/></>,
 clipboard:<><rect x="5" y="4" width="14" height="18" rx="2"/><path d="M9 4.5h6M9 13l2 2 4-4"/></>,
 ruler:<><path d="m21 8-5-5L3 16l5 5z"/><path d="m13 6 2 2m-5 1 2 2m-5 1 2 2"/></>,
 box:<><path d="m12 2 9 5v10l-9 5-9-5V7zM3 7l9 5 9-5M12 12v10"/></>,
 card:<><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h5"/></>,
 chart:<><path d="M4 21V13m5 8V8m5 13V3m5 18v-10" strokeWidth="3"/></>,
 settings:<><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l-1.8 1.8a1.7 1.7 0 0 0-1.88-.34l-1 .42a1.7 1.7 0 0 0-1.06 1.57h-2.6a1.7 1.7 0 0 0-1.06-1.57l-1-.42a1.7 1.7 0 0 0-1.88.34l-1.8-1.8A1.7 1.7 0 0 0 5 15l-.42-1A1.7 1.7 0 0 0 3 13v-2a1.7 1.7 0 0 0 1.58-1l.42-1a1.7 1.7 0 0 0-.34-1.88l1.8-1.8A1.7 1.7 0 0 0 8.34 5l1-.42A1.7 1.7 0 0 0 10.4 3h2.6a1.7 1.7 0 0 0 1.06 1.58l1 .42a1.7 1.7 0 0 0 1.88-.34l1.8 1.8A1.7 1.7 0 0 0 19.4 9l.42 1A1.7 1.7 0 0 0 21 11v2a1.7 1.7 0 0 0-1.18 1z"/></>,
 bag:<><rect x="4" y="7" width="16" height="15" rx="2"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></>,
 clock:<><circle cx="12" cy="12" r="9"/><path d="M12 7v6l4 2"/></>,
 check:<><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></>,
 file:<><path d="M6 2h9l5 5v15H6zM15 2v5h5M9 12h8M9 16h8"/></>,
 bolt:<><path d="m13 2-9 12h7l-1 8 10-12h-7z"/></>,
 bulb:<><path d="M9 18h6m-6 3h6M9 15a7 7 0 1 1 6 0l-1 3h-4z"/></>,
 logout:<><path d="M10 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h5M14 8l4 4-4 4M8 12h10"/></>,
 search:<><circle cx="10" cy="10" r="7"/><path d="m15 15 6 6"/></>,
 bell:<><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></>,
 calendar:<><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 10h18"/></>,
 arrow:<><path d="M4 12h16m-6-6 6 6-6 6"/></>
}
export default function Icon({name,size=24,className='',...props}){return <svg {...props} className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{shapes[name]||shapes.box}</svg>}
