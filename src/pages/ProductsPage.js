import React, { useContext, useEffect, useState } from 'react';
import { ProductsContext } from '../context/ProductsContext';
import { getData } from '../api/get-data';
import { ProductCard } from '../components/ProductCard';
import { useWindowSize } from '../helpers/resize';
import { useDebounce } from '../helpers/debounce';
import { Redirect, useHistory, useParams } from 'react-router';
import { Loader } from '../components/Loader';
import { ProductsSort } from '../components/ProductsSort';
import { CartContext } from '../context/CartContext';
import { useMessage } from '../helpers/message';
import { PaginationContext } from '../context/PaginationContext';
import { usePagination } from '../helpers/usePagination';

export const ProductsPage = () => {
  // Получаем контекст...
  const [products, setProducts] = useContext(ProductsContext);
  const [cartList, addToCart] = useContext(CartContext);

  //current, chunk, idx, setCurrent, setChunk, setIdx
  const [current, chunk, idx, setCurrent, setChunk, setIdx] =
    useContext(PaginationContext);
  const pag = usePagination();

  const message = useMessage();

  //состояние пропсов, передаваемых в компонент сортировки

  const [props, setProps] = useState([]);

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
  const history = useHistory();

  //Отслеживаем изменение размера окна. Если осуществляется переход от меньшего к большему - обнуляем perPage

  const resizeWatcher = debounce(() => {
    if (x < 565) {
      setIdx(0);
      setMin(true);
    } else {
      if (x > 565 && min) {
        pag('pagination/idx', 6, 0);
        setMin(false);
      } else {
        return;
      }
    }
  }, 300);

  // Получаем список продуктов из БД используя параметры из ссылки,
  // полученный результат записываем в контекст

  function normalize(arr) {
    return arr.reduce((acc, cur) => {
      return acc.concat(cur);
    }, []);
  }

  useEffect(() => {
    async function get() {
      try {
        const result = await getProducts('/products/' + params.slug);
        if (!result) {
          message({ text: 'Lost connection, or page not found', type: 'error' });
          history.push('/404');
        }
        setProps(normalize(result));
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
    get();
    return () => {
      setProducts([]);
    };
  }, [params]);

  useEffect(() => {
    setIdx(0);
  }, [products]);

  // Вешаем обработчик ресайза

  useEffect(() => {
    resizeWatcher();
  }, [x]);

  function add(obj) {
    addToCart(obj);
    message({ text: `${obj.name} added to cart!`, type: 'success' });
  }
  const sorting = () => {
    setIdx(0);
  };
  return (
    <main className="products-page">
      <section className={`products-page__banner ${params?.slug}`}>
        <h1> {params?.slug} </h1>
      </section>
      <div className="divider"></div>
      <section className="products-page__wrapper">
        <div className="container">
          <ProductsSort props={props} sorting={sorting} />{' '}
          {current.length ? (
            <div className="products-page__pagination row">
              <button
                className="btn btn-orange"
                disabled={idx === 0}
                onClick={() => pag('pagination/prev', 6)}
              >
                {' '}
                prev{' '}
              </button>
              {current.length ? (
                <ul className="products-page__controls-box">
                  {current.map((el, i) => (
                    <li
                      className={i === idx ? 'controls active' : 'controls'}
                      key={i}
                      onClick={() => setIdx(i)}
                    >
                      {i + 1}
                    </li>
                  ))}
                </ul>
              ) : null}

              <button
                className="btn btn-orange"
                disabled={idx === current.length - 1}
                onClick={() => pag('pagination/next', 6)}
              >
                {' '}
                next{' '}
              </button>
            </div>
          ) : null}
          <div className="grid">
            {loading ? (
              <Loader />
            ) : (
              <>
                {chunk.length ? (
                  chunk.map((el) => {
                    return <ProductCard props={[el, add]} key={el._id} />;
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
