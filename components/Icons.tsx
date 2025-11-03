import React from 'react';

interface IconProps {
  className?: string;
}

export const PlusIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

export const ArrowLeftIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

export const TrashIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

export const EditIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
  </svg>
);

export const CameraIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const HorseIcon: React.FC<IconProps> = ({ className }) => (
 <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M5.72 21.468c.49.23 1.03.352 1.58.352 2.37 0 4.3-1.93 4.3-4.3 0-.34-.05-.67-.13-1a1 1 0 0 1 .8-1.21l1.1-.37c1.3-.43 2.62-1.03 3.82-1.82a1 1 0 0 0 .13-1.4l-1.3-1.58a1 1 0 0 0-1.3-.23l-1.42.7a1 1 0 0 1-1.2-.23l-.7-1.42a1 1 0 0 1 .23-1.2l1.42-.7a1 1 0 0 0 .23-1.3l-1.58-1.3a1 1 0 0 0-1.4.13c-.8 1.2-1.39 2.52-1.82 3.82l-.37 1.1a1 1 0 0 1-1.2.8c-.33-.08-.66-.13-1-.13-2.37 0-4.3 1.93-4.3 4.3 0 .55.122 1.09.352 1.58zM17.5 2.5a1 1 0 0 0-1 1v.78c-1.83.6-3.46 1.7-4.8 3.22H11a1 1 0 0 0-.8.4L9 9.12V8a1 1 0 0 0-2 0v4.24l-1.12 1.12A2.5 2.5 0 0 0 5.5 15c0 .32.07.63.18.91l-1.4 1.4A1.5 1.5 0 0 0 3 18.5V20a1 1 0 0 0 2 0v-1.5a1.5 1.5 0 0 0-.2-1.58l.7-.7c.18.06.37.1.58.1.9 0 1.68-.53 2.08-1.32L10 14.12V12a1 1 0 0 0-1-1H7.88l1.2-1.2c1.3-1.3 2.88-2.2 4.62-2.58V8a1 1 0 0 0 2 0V6.43c1.1.2 2.13.6 3.07 1.27l1.42-1.42a1 1 0 0 0-1.4-1.4l-1.42 1.42A7.89 7.89 0 0 0 14.22 5H15a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-1a1 1 0 1 0 0 2h.5a7.9 7.9 0 0 0-1.57-.22A8.9 8.9 0 0 1 15 2.5c.87 0 1.69.13 2.5.36V2.5a1 1 0 0 0-1-1h-1a1 1 0 1 0 0 2h.36A8.9 8.9 0 0 1 17.5 2.5z"/>
 </svg>
);

export const UploadIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);

export const DownloadIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);
