# Product Brief: ZKJ - Controle de Qualidade

## Project Overview

ZKJ - Controle de Qualidade is a horse breeding and farm management application designed for tracking individual horses, their lineage, and breeding history. The app enables users to maintain comprehensive records of their equine stock, including birth details, parentage, registration information, and mating records. All data is stored locally on the user's device, ensuring privacy and offline functionality.

## Target Audience

- **Primary**: Horse breeders and farm owners managing equine breeding operations
- **Secondary**: Small to medium-sized stud farms (haras) requiring organized record-keeping
- **Use Case**: Users who need to track horse genealogy, breeding history, and maintain detailed records without relying on cloud services

## Primary Benefits / Features

### Core Features
- **Horse Registry**: Complete horse profiles with name, birth date, gender, chip number, and registration details
- **Lineage Tracking**: Record parentage (father/mother) for genealogical documentation
- **Breeding Management**: Track mating records for female horses, including male partner and date
- **Photo Management**: Attach photos to horse profiles (stored as base64)
- **Birth Documentation**: Record birth place and delivery details
- **Data Portability**: Import/export functionality for backup and data migration (JSON format)

### Key Benefits
- **Offline-First**: Fully functional without internet connection
- **Privacy-Focused**: All data stored locally on device
- **User-Friendly**: Simple, mobile-optimized interface
- **Data Ownership**: Complete control over data with export capabilities

## High-Level Tech/Architecture

### Current Stack
- **Frontend Framework**: React 19.2.0 with TypeScript
- **Build Tool**: Vite 6.4.1
- **Storage**: IndexedDB via `idb` library (local browser storage)
- **Styling**: TailwindCSS (via CDN)
- **Platform**: Web application (PWA-ready)

### Architecture Pattern
- **Component-Based**: Modular React components for UI separation
- **State Management**: React hooks (useState, useMemo) with custom hooks
- **Data Layer**: Custom hook (`useLocalStorage`) abstracting IndexedDB operations
- **Navigation**: View-based state machine (LIST, DETAIL, ADD, EDIT, MATE)
- **File Handling**: HTML5 File API for import/export operations

### Future Considerations
- **Mobile Portability**: Evaluated for React Native/Expo migration (7/10 portability score)
- **Potential Enhancements**: Cloud sync, advanced analytics, multi-user support
