const env = {
    LANDING_PAGE_URL: "http://localhost:3001",
    APP_URL: "http://localhost:5173",
    API_URL: "http://localhost:3000",
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:"pk_test_51SqdSMRgE4DdaZlCz9jd2jG8w60jL5Wvh25BUdaTMHOEexqCgY2vOKGAXTXqmtRxO2OFeR8PD72q88tqPoXvdFyO00s1whs4HL"
}

if (process.env.NODE_ENV === "production") {
    env.LANDING_PAGE_URL = "https://formify.com.br"
    env.APP_URL = "https://app.formify.com.br"
    env.API_URL = "https://api-formify.formify.com.br"
}

export default env