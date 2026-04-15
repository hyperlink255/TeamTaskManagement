import React, { useState } from "react";
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";
import { CiCalendar } from "react-icons/ci";


const CustomCalendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [showCalender,setShowCalender] = useState(false)
    

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const totalDays = new Date(year, month + 1, 0).getDate();

    const firstDayIndex = new Date(year, month, 1).getDay();

    const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1);

    const handlePrev = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const handleNext = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const today = new Date();

    return (
        <div>
            <div onClick={() => setShowCalender(!showCalender)} className="flex  text-gray-800 cursor-pointer bg-white  border 
            relative gap-2 items-center text-right p-2 border-gray-300 ml-auto shadow w-[150px]">
                <CiCalendar size={20}/>
                <p >{currentDate.toLocaleDateString("en-US", {year:"numeric",month:"2-digit",day:"2-digit"})}</p>
            </div> 
            {showCalender && (

            <div className="w-80 bg-white z-20 absolute top-[100%] right-0 shadow-md p-4 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                    <button className="cursor-pointer text-gray-800" onClick={handlePrev}>
                        <GrFormPrevious size={20} />
                    </button>
                    <h2 className="font-semibold text-gray-800">
                        {currentDate.toLocaleString("default", { month: "long" })} {year}
                    </h2>
                    <button className="cursor-pointer text-gray-800" onClick={handleNext}>
                        <GrFormNext size={20} />
                    </button>
                </div>

                <div className="grid grid-cols-7 text-center text-gray-800 text-sm font-semibold mb-2">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                        <div key={day}>{day}</div>
                    ))}
                </div>

                <div className="grid grid-cols-7 text-center gap-1">
                    {Array.from({ length: firstDayIndex }).map((_, i) => (
                        <div key={"empty" + i}></div>
                    ))}

                    {daysArray.map(day => {
                        const isToday =
                            day === today.getDate() &&
                            month === today.getMonth() &&
                            year === today.getFullYear();
                        return (
                            <div 
                               onClick={() => {setCurrentDate(new Date(year,month,day)),setShowCalender(false)}}
                                key={day}
                                className={`p-2 text-gray-800 rounded-md cursor-pointer ${isToday ? "bg-blue-500 text-white" : "hover:bg-gray-200"
                                    }`}
                            >
                                {day}
                            </div>
                        );
                    })}
                </div>
            </div>
            ) }
        </div>
    );
};

export default CustomCalendar;
