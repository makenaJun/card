import React, {useState, useEffect} from 'react';
import s from './Paganation.module.css'

type PaginatorType = {
    currentPage:number
    pageSize:number
    totalItemsCount:number
    onPageChanged:(e:any) => void
}

export const Paginator2: React.FC<any> = (props:PaginatorType) => {
    const {currentPage = 2, pageSize = 10, totalItemsCount = 150, onPageChanged} = props;


    // Количество страниц
    const portionSize = Math.ceil(totalItemsCount / pageSize); //размер страницы
    const [portionCount, setPortionCount] = useState<number>(5); //количество страниц
    const leftPortion = (portionCount - 1) * portionCount + 1;
    const rightPortion = portionCount * pageSize + 1


    const pages: Array<number> = []
    for (let i = 1; i <= portionSize; i++) {
        pages.push(i);
    }

    const prevPortionHandler = () => setPortionCount(portionCount - 1);

    const nextPortionHandler = () => setPortionCount(portionCount + 1);


    return (
        <div className={s.container}>
            {portionCount > 1 && <button onClick={prevPortionHandler}>prev</button>}
            {
                pages.filter(p => p >= leftPortion && p <= rightPortion)
                    .map((p, i) => {
                        return (
                            <div
                                key={i}
                                className={`${currentPage === p ? s.selectedPage : s.noSelectedPage }`}
                                onClick={onPageChanged}
                            >{p} </div>
                        )
                    })
            }

            {portionSize > portionCount && <button onClick={nextPortionHandler}>next</button>}
        </div>
    );
};

