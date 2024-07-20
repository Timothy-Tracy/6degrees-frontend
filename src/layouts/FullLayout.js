import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Container } from "reactstrap";
import GlobalErrorComponent from "../errors/GlobalErrorComponent";

const FullLayout = () => {
  return (
    <main>
      <div className="pageWrapper d-lg-flex">
        {/********Sidebar**********/}
        {/* 
              <aside className="sidebarArea shadow" id="sidebarArea">
          <Sidebar />
        </aside>
       ß */}

        {/********Content Area**********/}

        <div className="contentArea">
          {/********header**********/}
          <Header />
          <GlobalErrorComponent></GlobalErrorComponent>
          {/********Middle Content**********/}
          <Container className="p-4 wrapper" fluid>
            <Outlet />
          </Container>
        </div>
      </div>
    </main>
  );
};

export default FullLayout;
