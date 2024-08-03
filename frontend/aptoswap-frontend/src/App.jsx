import React from "react";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react"
import { MartianWalletAdapter } from "@manahippo/aptos-wallet-adapter";
import SwapForm from "./components/SwapForm";
import { Layout, Row, Col } from "antd";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";

const wallets = [new MartianWalletAdapter()];

const App = () => (
  <AptosWalletAdapterProvider wallets={wallets} autoConnect>
    <Layout>
      <Row align="middle" style={{ marginTop: "2rem" }}>
        <Col span={12} offset={6}>
          <h1>Token Swap App</h1>
          <WalletSelector />
          <SwapForm />
        </Col>
      </Row>
    </Layout>
  </AptosWalletAdapterProvider>
);

export default App;
