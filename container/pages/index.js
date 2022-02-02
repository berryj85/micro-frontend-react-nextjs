import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import dynamic from 'next/dynamic';
const DashboardHome = dynamic(() => import("dashboard/DashboardHome"),{ ssr: false});
export default function Home() {
  return (
    <DashboardHome />
  )
}
