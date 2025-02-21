import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import CalMain from "./pages/CalMain";
import TodoMain from "./pages/TodoMain";
import TodoWrite from "./pages/TodoWrite";
import TodoModify from "./pages/TodoModify";
import TodoView from "./pages/TodoView";
import Password from "./pages/Password";
import NickName from "./pages/NickName";
import MyPage from "./pages/MyPage";
import Process from "./pages/Process";
import { useAuthStore } from "./hooks/useAuthStore";

function App() {
  //const { loginFlag } = useAuthStore();

  return (
    // url Router 설정
    // <Router>
    //   <Routes>
    //     <Route path="/process" element={<Process />} />
    //     <Route element={<Layout />}>
    //       <Route path="/" element={loginFlag ? <Navigate to="/calMain" /> : <Login />} />
    //       <Route path="/calMain" element={loginFlag ? <CalMain /> : <Navigate to="/" />} />
    //       <Route path="/password" element={loginFlag ? <Password /> : <Navigate to="/" />} />
    //       <Route path="/nickName" element={loginFlag ? <NickName /> : <Navigate to="/" />} />
    //       <Route path="/todoMain" element={loginFlag ? <TodoMain /> : <Navigate to="/" />} />
    //       <Route path="/todoWrite" element={loginFlag ? <TodoWrite /> : <Navigate to="/" />} />
    //       <Route path="/todoView" element={loginFlag ? <TodoView /> : <Navigate to="/" />} />
    //       <Route path="/myPage" element={loginFlag ? <MyPage /> : <Navigate to="/" />} />
    //     </Route>
    //   </Routes>
    // </Router>
    <Router>
      <Routes>
        <Route path="/process" element={<Process />} />
        {/* process 페이지는 헤더, 푸터 필요 X -> 분리 */}
        <Route element={<Layout />}>
          <Route path="/" element={<Login />} />
          <Route path="/calMain" element={<CalMain />} />
          <Route path="/password" element={<Password />} />
          <Route path="/nickName" element={<NickName />} />
          <Route path="/todoMain" element={<TodoMain />} />
          <Route path="/todoWrite" element={<TodoWrite />} />
          <Route path="/todoModify" element={<TodoModify />} />
          <Route path="/todoView" element={<TodoView />} />
          <Route path="/myPage" element={<MyPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

// 공통 레이아웃
function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
