import React, { useContext, useEffect, useState } from 'react';
import { ProductsContext } from '../context/ProductsContext';
import { getData } from '../api/get-data';
import { ProductCard } from '../components/ProductCard';
import { useWindowSize } from '../helpers/resize';
import { useDebounce } from '../helpers/debounce';
import { useParams } from 'react-router';
import { Loader } from '../components/Loader';

export const ProductsPage = () => {
  // Получаем контекст...
  const [products, setProducts] = useContext(ProductsContext);
  // Список продуктов для отображения...
  const [currentProducts, setCurrentProducts] = useState([]);
  // Контроллеры переключения пагинации
  const [pagesControls, setpagesControls] = useState([]);
  // Состояние страниц
  const [page, setPage] = useState(1);
  // Количество на странице...
  const [perPage, setPerPage] = useState(6);

  const [loading, setLoading] = useState(true);
  // Хук, навешивает прослушку на ресайз и возвращает значение x/y (ширина, высота)
  const [x, y] = useWindowSize();
  // Проверка и хранение сотояния ресайза, был ли переход к меньшему...
  const [min, setMin] = useState(false);
  // Хук дебаунс...
  const debounce = useDebounce();
  // Функция гет из АПИшки
  const getProducts = getData();

  const params = useParams();

  //Отслеживаем изменение размера окна. Если осуществляется переход от меньшего к большему - обнуляем perPage

  const resizeWatcher = debounce(() => {
    if (x < 565) {
      setPage(1);
      setMin(true);
    } else {
      if (x > 565 && min) {
        setPerPage(6);
        setMin(false);
      } else {
        return;
      }
    }
  }, 300);

  // Получаем список продуктов из БД используя параметры из ссылки,
  // полученный результат записываем в контекст

  useEffect(() => {
    async function get() {
      try {
        const result =
          (await getProducts('/products/' + params.slug).catch((e) =>
            console.error(e)
          )) || [];
        setProducts(result);
        setLoading(false);
      } catch (error) {
        console.error(error);
        // setLoading(false);
      }
    }
    get();
    return () => {
      setProducts([]);
    };
  }, [params]);

  // Получаем количество страниц, формируем
  // массив для коректоного отображения рендера наших контроллеров пагинации...
  // и подписываемся на изменение списка продуктов
  useEffect(() => {
    if (products.length)
      setpagesControls(new Array(Math.ceil(products.length / perPage)).fill(''));

    return () => setpagesControls([]);
  }, [products, params]);

  // Вызов функции пагинации, следим за изменением стейта...

  useEffect(() => {
    pagination();
  }, [products, page, perPage]);

  // Вешаем обработчик ресайза

  useEffect(() => {
    resizeWatcher();
  }, [x]);

  // Пагинация --------------//

  const pagination = () => {
    let chunk = page * perPage - perPage;
    chunk > 0 ? chunk-- : (chunk = chunk);
    setCurrentProducts(products?.slice(chunk, perPage));
  };

  const prev = () => {
    if (page > 1) {
      setPage((v) => (v -= 1));
    }
  };

  const next = () => {
    if (pagesControls.length > page) {
      setPage((v) => (v += 1));
    }
  };

  return (
    <main className="products-page">
      <section className={`products-page__banner ${params.slug}`}>
        <h1> {params.slug} </h1>
      </section>
      <div className="divider"></div>
      <section className="products-page__wrapper">
        <div className="container">
          {' '}
          {pagesControls.length ? (
            <div className="products-page__pagination row">
              <button className="btn btn-orange" onClick={prev}>
                {' '}
                prev{' '}
              </button>
              {pagesControls.length ? (
                <ul className="products-page__controls-box">
                  {pagesControls.map((el, i) => (
                    <li
                      className={i + 1 === page ? 'controls active' : 'controls'}
                      key={i}
                      onClick={() => setPage(i + 1)}
                    >
                      {i + 1}
                    </li>
                  ))}
                </ul>
              ) : null}

              <button className="btn btn-orange" onClick={next}>
                {' '}
                next{' '}
              </button>
            </div>
          ) : null}
          <div className="row">
            {loading ? (
              <Loader />
            ) : (
              <>
                {currentProducts.length ? (
                  currentProducts.map((el) => {
                    return <ProductCard props={el} key={el._id} />;
                  })
                ) : (
                  <p
                    style={{
                      color: 'wheat',
                      textAlign: 'center',
                      fontSize: '24px',
                      width: '100%',
                    }}
                  >
                    {' '}
                    Empty{' '}
                  </p>
                )}
              </>
            )}
          </div>
          <div className="products-page__load-more  row">
            <button
              className="btn btn-orange"
              onClick={() => {
                setPerPage((v) => v + perPage);
              }}
              disabled={products.length <= perPage}
            >
              {' '}
              show more{' '}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};
