import React, { useState, useEffect } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Layout, Row, Col, Button, Spin, Input, Select, message } from "antd";
import { AptosClient } from "aptos";

const { Option } = Select;
const client = new AptosClient("https://fullnode.devnet.aptoslabs.com");

const SwapForm = () => {
  const { connect, account, signAndSubmitTransaction, connected } = useWallet();
  const [fromToken, setFromToken] = useState("");
  const [toToken, setToToken] = useState("");
  const [amount, setAmount] = useState("");
  const [tokens, setTokens] = useState([]);
  const [transactionInProgress, setTransactionInProgress] = useState(false);

  useEffect(() => {
    if (connected) {
      fetchTokens();
    }
  }, [connected]);

  const fetchTokens = async () => {
    // Fetch the list of available tokens
    // You can replace this with an actual API call or predefined list
    const availableTokens = ["APT", "TOKEN1", "TOKEN2"];
    setTokens(availableTokens);
  };

  const handleSwap = async () => {
    if (!connected) {
      await connect();
    }

    setTransactionInProgress(true);

    try {
      const payload = {
        type: "entry_function_payload",
        function: "0x1::coin::swap", // Adjust with the correct swap function
        arguments: [fromToken, toToken, amount],
        type_arguments: [],
      };

      const transaction = await signAndSubmitTransaction({ payload });
      await client.waitForTransaction(transaction.hash);

      message.success("Swap successful!");
    } catch (error) {
      console.error("Error swapping tokens:", error);
      message.error("Swap failed.");
    } finally {
      setTransactionInProgress(false);
    }
  };

  return (
    <Layout>
      <Row align="middle" style={{ marginTop: "2rem" }}>
        <Col span={12} offset={6}>
          <Spin spinning={transactionInProgress}>
            <h2>Swap Aptos Tokens</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSwap();
              }}
            >
              <div>
                <label htmlFor="fromToken">From Token:</label>
                <Select
                  id="fromToken"
                  value={fromToken}
                  onChange={setFromToken}
                  style={{ width: "100%", marginBottom: "1rem" }}
                  placeholder="Select From Token"
                >
                  {tokens.map((token) => (
                    <Option key={token} value={token}>
                      {token}
                    </Option>
                  ))}
                </Select>
              </div>
              <div>
                <label htmlFor="toToken">To Token:</label>
                <Select
                  id="toToken"
                  value={toToken}
                  onChange={setToToken}
                  style={{ width: "100%", marginBottom: "1rem" }}
                  placeholder="Select To Token"
                >
                  {tokens.map((token) => (
                    <Option key={token} value={token}>
                      {token}
                    </Option>
                  ))}
                </Select>
              </div>
              <div>
                <label htmlFor="amount">Amount:</label>
                <Input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  style={{ width: "100%", marginBottom: "1rem" }}
                  required
                />
              </div>
              <Button type="primary" htmlType="submit" block>
                Swap
              </Button>
            </form>
          </Spin>
        </Col>
      </Row>
    </Layout>
  );
};

export default SwapForm;
