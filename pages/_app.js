import '../styles/globals.css';
    import Head from 'next/head';
    import Header from '../components/header'
    import Footer from '../components/footer'
    import { JsonLd, getOrganizationSchema } from "../components/schema.js"

    export default function App({ Component, pageProps }) {
      return (
      <>
        <Head>
          <title>TechVibe</title>
          <meta name="description" content="TechVibe is a comprehensive online device marketplace platform for buying, selling, renting, leasing, and giving away all types of electronic devices, featuring advanced search, user profiles, repair service locator, and optional paid assistance." />
        </Head>
        <JsonLd data={getOrganizationSchema()} />
        <Header/>
        <Component {...pageProps} />
        <Footer/>
      </>
        );
    }