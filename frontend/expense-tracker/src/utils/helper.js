import moment from "moment";
import { BASE_URL } from "./apiPaths";

export const validateEmail=(email)=>{
    const regex=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
};

export const getInitials=(name)=>{
    if (!name) return "";

    const words=name.split(" ");
    let initials="";

    for(let i=0;i<Math.min(words.length,2);i++){
        initials+=words[i][0];
    }
    return initials.toUpperCase();
};

export const addThousandSeparator=(num)=>{
    if (num==null || isNaN(num)) return "";

    const [integerPart,fractionalPart]=num.toString().split(".");
    const formattedInteger=integerPart.replace(/\B(?=(\d{3})+(?!\d))/g,",");

    return fractionalPart ? `${formattedInteger}.${fractionalPart}` : formattedInteger;
};

export const prepareExpenseBarChartData=(data=[])=>{
    console.log('prepareExpenseBarChartData - input data:', data);
    console.log('prepareExpenseBarChartData - is Array:', Array.isArray(data));
    console.log('prepareExpenseBarChartData - data length:', data?.length);
    
    // Add safety check
    if (!data || !Array.isArray(data) || data.length === 0) {
        console.log('prepareExpenseBarChartData - returning empty array due to invalid data');
        return [];
    }
    
    // Group expenses by category for better visualization
    const groupedData = data.reduce((acc, item) => {
        const category = item?.category || 'Other';
        if (!acc[category]) {
            acc[category] = {
                month: category, // Changed from 'category' to 'month' to match CustomBarChart dataKey
                amount: 0,
                category: category // Keep category for tooltip
            };
        }
        acc[category].amount += item?.amount || 0;
        return acc;
    }, {});
    
    const chartData = Object.values(groupedData);
    
    console.log('prepareExpenseBarChartData - final chartData:', chartData);
    return chartData;
};

export const prepareIncomeBarChartData=(data=[])=>{
    console.log('prepareIncomeBarChartData - input data:', data);
    console.log('prepareIncomeBarChartData - data type:', typeof data);
    console.log('prepareIncomeBarChartData - is Array:', Array.isArray(data));
    console.log('prepareIncomeBarChartData - data length:', data?.length);
    
    // Add safety check for data
    if (!data || !Array.isArray(data) || data.length === 0) {
        console.log('prepareIncomeBarChartData - returning empty array due to invalid data');
        return [];
    }
    
    const sortedData=[...data].sort((a,b)=>new Date(a.date)-new Date(b.date));
    console.log('prepareIncomeBarChartData - sortedData:', sortedData);
    
    const chartData=sortedData.map((item)=>({
        month:moment(item?.date).format("Do MMM"),
        amount:item?.amount,
        source:item?.source,
    }));
    
    console.log('prepareIncomeBarChartData - final chartData:', chartData);
    return chartData;
};

export const prepareExpenseLineChartData=(data=[])=>{
    const sortedData=[...data].sort((a,b)=>new Date(a.date)-new Date(b.date));

    const chartData=sortedData.map((item)=>({
        month:moment(item?.date).format("Do MMM"),
        amount:item?.amount,
        category:item?.category,
    }));
    return chartData;
};

// Resolve image URLs that may be relative (e.g., "/uploads/abc.jpg") to absolute using BASE_URL
export const resolveImageUrl = (url) => {
    if (!url || typeof url !== 'string') return "";
    // If already absolute (http or https), return as-is
    if (/^https?:\/\//i.test(url)) return url;
    // Ensure single slash between BASE_URL and path
    const needsSlash = url.startsWith("/") ? "" : "/";
    return `${BASE_URL}${needsSlash}${url}`;
};
