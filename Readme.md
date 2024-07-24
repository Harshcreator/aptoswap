# Aptoswap

### 📖 Contents

- `pool.move`: The core implementation for Aptoswap.
- `pool_test.move`: The test case and back-testing for `pool.move`.
- `utils.move`: Useful utilities for Aptoswap.
- `contract-address`: 0xc53e6c1a15dc3d311ae20842158286c7bb69e5e0c3f2d99fc614abeaec5965e4

## 🏃 Getting Started

- Clone the repo:

```shell
git clone https://github.com/Harshcreator/aptoswap.git
```

- Update the submodule of `aptos-core`:

```shell
git submodule update --init --recursive
```

- Run test cases (make sure your `aptos` command line is compatiable with the `aptos-core` in `submodules`):

```
aptos move test
```

- Compile the module:

```shell
# Initialize the ./.aptos
aptos init
# Compile
aptos move compile --named-addresses Aptoswap=default --save-metadata
```
