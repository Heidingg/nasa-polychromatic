import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import axios from 'axios';
import Link from 'next/link';

export default function Home() {
  const [data, setData] = useState();

  const apiKey="ib7iWNom5r7j1kua5Hth5LhkMVkPkonow6c1L7xa"
  const url=`https://api.nasa.gov/techtransfer/patent/?q=10&engine&api_key=${apiKey}`

  const getTechTransferData = async()=>{
    const res = await axios.get(url);
    const info = await res.data;
    console.log(info);
    setData(info)
  }

  useEffect(()=> {
    getTechTransferData();
  },[]);

  return (
    <>
      <Head>
        <title>NASA Earth</title>
        <meta name="description" content="NASA Earth" />
        <link rel="icon" href="/rockets.png" />
      </Head>

      <main className={styles.main}>
      <a href="/polychromatic">
      <img
            src="astronaut.png"
            className={styles.nasa}
            alt="NASA logo"
          
          />
      </a>
      
          <div className={styles.content}>
            <h1>Click on Astronaut to see Polychromatic Earth</h1>
            </div>

        <div className={styles.Head}>
          <h1> NASA GALLERY</h1>
        </div>
        <section className={`${styles.gallery} overflow-hidden text-gray-700`}>
          <div className="container px-5 py-2 mx-auto lg:pt-12 lg:px-32">
            <div className="flex flex-wrap -m-1 md:-m-2">
              {data &&
                data.results.map((tech, index) => {
                  return tech && tech.map((t, ind) => {
                    if (ind === 10) {
                      return (
                        <div key={ind} className="flex flex-wrap w-1/3">
                        <div className="w-full p-1 md:p-2">
                        <div className={styles.Img}>
                        <label htmlFor={`image-${ind}`} className={`${styles["img-card"]}`}>
                        <Image
                          src={t}
                          alt={t}
                          width={310}
                          height={280}
                          className={`${styles.border}`}
                          />
                        <input type="radio" id={`image-${ind}`} name="image" value={t} />
                        </label>
                        </div>
                        </div>
                      </div>
                      );
                    }
                  });
                })}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
