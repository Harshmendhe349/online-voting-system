import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";
import { useState } from "react";


export default function Carousel({ slides }) {

    let [current, setCurrent] = useState();
    let previousSlide = () => {
        if (current === 0) setCurrent(slides.length - 1);
        else setCurrent(current - 1);
    }
    let nextSlide = () => {
        if (current === slides.length - 1) setCurrent(0);
        else setCurrent(current + 1);
    }
    return (
        <div className="overflow-hidden relative w-full">
            <div className={`flex transition ease-out  duration-40`}
                style={{
                    transform: `translateX(-${current * 100}%)`,
                }}
            >
                {slides.map((s) => {
                    return <img src={s} />
                })}
            </div>

            <div className="absolute top-0 h-full w-full flex justify-between items-center px-8 text-[20px]">
                <button onClick={previousSlide}>
                    <FaArrowCircleLeft />
                </button>
                <button onClick={nextSlide}>
                    <FaArrowCircleRight />
                </button>
            </div>


            <div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full">
                {slides.map((s, i) => {
                    return(
                    <div
                    onClick={() => {
                        setCurrent(i);
                    }}
                    key={"circle" + i}
                    className={`rounded-full w-5 h-5 cursor-pointer ${i == current ? "bg-white" : "bg-gray-300"}`}
                    >

                    </div>
                    )
                })}
                
            </div>
        </div>


    );
}