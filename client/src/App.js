import { Box, CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { themeSettings } from "./theme";
import { useMemo, useState } from "react";
import {
  Outlet,
  Navigate,BrowserRouter, Route, Routes 
} from "react-router-dom";
import Nav from "./components/nav/Nav";
import SideBar from "./components/sidebar/SideBar";
import Dashboard from "./pages/dashboard/Dashboard";
import Products from "./pages/products/Products";
import Admin from "./pages/admin/Admin";
import Breakdown from "./pages/breakdown/Breakdown";
import Customer from "./pages/customer/Customer";
import Geography from "./pages/geography/Geography";
import Overview from "./pages/overview/Overview";
import Performance from "./pages/performance/Performance";
import Transactions from "./pages/transactions/Transactions";
import Daily from "./pages/daily/Daily";
import Monthly from "./pages/monthly/Monthly";
import { useQuery } from '@tanstack/react-query'
import newRequest from './state/newRequest';


function App() {

  // mui theme settting
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  const isNonMobile = useMediaQuery('(min-width: 600px)');
  const [ isSidebarOpen, setIsSidebarOpen ] = useState(true)

  // USER DATA 
  const userId = useSelector((state) => state.global.userId);
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
    newRequest.get(`/general/user/${userId}`).then((res) => {
      return res.data
    })
  }) 
  
  const Layout = () => {
    return (
      <Box display={ isNonMobile ? 'flex' : 'block'} width='100%' height='100%'>
        <SideBar 
          user={ data || {} }
          isNonMobile={isNonMobile}
          setIsSidebarOpen={setIsSidebarOpen}
          isSidebarOpen={isSidebarOpen}
          drawerWidth='250px'
        />
        <Box flexGrow={1}>
          <Nav 
            user={ data || {} }
            setIsSidebarOpen={setIsSidebarOpen}
            isSidebarOpen={isSidebarOpen}
            drawerWidth='250px'
          />
          <Outlet/>
        </Box>
      </Box>
  )
  }

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Routes>
          <Route element={<Layout/>}>
            <Route path="/" element={<Navigate to="/dashboard"/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/products" element={<Products/>} />
            <Route path="/admin" element={<Admin/>} />
            <Route path="/breakdown" element={<Breakdown/>} />
            <Route path="/customers" element={<Customer/>} />
            <Route path="/geography" element={<Geography/>} />
            <Route path="/overview" element={<Overview/>} />
            <Route path="/performance" element={<Performance/>} />
            <Route path="/transactions" element={<Transactions/>} />
            <Route path="/daily" element={<Daily/>} />
            <Route path="/monthly" element={<Monthly/>} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
