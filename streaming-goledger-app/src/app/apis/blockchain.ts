import api from "@/service/api";
import axios from "axios";

export class BlockchainApi {
  static async getHeader() {
    try {
      const response = await api.get("/query/getHeader");

      switch (response.status) {
        case 200:
          return { data: response.data };

        default:
          console.error(`Erro na API: ${response.statusText}`);
          return { error: `Erro inesperado: ${response.status}` };
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Erro na resposta da API:", error.response);
        return {
          error: `Erro na API: ${error.response.status} - ${
            (error.response.data as { message?: string }).message ||
            "Erro desconhecido"
          }`,
        };
      } else if (axios.isAxiosError(error) && error.request) {
        console.error("Erro na requisição:", error.request);
        return { error: "Erro na requisição. Verifique sua conexão." };
      } else {
        console.error("Erro inesperado:", error);
        return { error: "Erro inesperado ao realizar a requisição" };
      }
    }
  }

  static async getTx() {
    try {
      const response = await api.get("/query/getTx");

      switch (response.status) {
        case 200:
          return { data: response.data };

        default:
          console.error(`Erro na API: ${response.statusText}`);
          return { error: `Erro inesperado: ${response.status}` };
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Erro na resposta da API:", error.response);
        return {
          error: `Erro na API: ${error.response.status} - ${
            (error.response.data as { message?: string }).message ||
            "Erro desconhecido"
          }`,
        };
      } else if (axios.isAxiosError(error) && error.request) {
        console.error("Erro na requisição:", error.request);
        return { error: "Erro na requisição. Verifique sua conexão." };
      } else {
        console.error("Erro inesperado:", error);
        return { error: "Erro inesperado ao realizar a requisição" };
      }
    }
  }

  static async getSchema() {
    try {
      const response = await api.get("/query/getSchema");

      switch (response.status) {
        case 200:
          return { data: response.data };

        default:
          console.error(`Erro na API: ${response.statusText}`);
          return { error: `Erro inesperado: ${response.status}` };
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Erro na resposta da API:", error.response);
        return {
          error: `Erro na API: ${error.response.status} - ${
            (error.response.data as { message?: string }).message ||
            "Erro desconhecido"
          }`,
        };
      } else if (axios.isAxiosError(error) && error.request) {
        console.error("Erro na requisição:", error.request);
        return { error: "Erro na requisição. Verifique sua conexão." };
      } else {
        console.error("Erro inesperado:", error);
        return { error: "Erro inesperado ao realizar a requisição" };
      }
    }
  }

  static async invokeTxtName(txName: string) {
    try {
      const response = await api.post(`/invoke/${txName}`);

      switch (response.status) {
        case 200:
          return { data: response.data };

        default:
          console.error(`Erro na API: ${response.statusText}`);
          return { error: `Erro inesperado: ${response.status}` };
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Erro na resposta da API:", error.response);
        return {
          error: `Erro na API: ${error.response.status} - ${
            (error.response.data as { message?: string }).message ||
            "Erro desconhecido"
          }`,
        };
      } else if (axios.isAxiosError(error) && error.request) {
        console.error("Erro na requisição:", error.request);
        return { error: "Erro na requisição. Verifique sua conexão." };
      } else {
        console.error("Erro inesperado:", error);
        return { error: "Erro inesperado ao realizar a requisição" };
      }
    }
  }

  static async queryTxtName(txName: string) {
    try {
      const response = await api.post(`/query/${txName}`);

      switch (response.status) {
        case 200:
          return { data: response.data };

        default:
          console.error(`Erro na API: ${response.statusText}`);
          return { error: `Erro inesperado: ${response.status}` };
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Erro na resposta da API:", error.response);
        return {
          error: `Erro na API: ${error.response.status} - ${
            (error.response.data as { message?: string }).message ||
            "Erro desconhecido"
          }`,
        };
      } else if (axios.isAxiosError(error) && error.request) {
        console.error("Erro na requisição:", error.request);
        return { error: "Erro na requisição. Verifique sua conexão." };
      } else {
        console.error("Erro inesperado:", error);
        return { error: "Erro inesperado ao realizar a requisição" };
      }
    }
  }

  static async detailsTx(txName: string) {
    const params = {
      assetType: txName,
    };
    try {
      const response = await api.post("query/getSchema", params);

      switch (response.status) {
        case 200:
          return { data: response.data };

        default:
          console.error(`Erro na API: ${response.statusText}`);
          return { error: `Erro inesperado: ${response.status}` };
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Erro na resposta da API:", error.response);
        return {
          error: `Erro na API: ${error.response.status} - ${
            (error.response.data as { message?: string }).message ||
            "Erro desconhecido"
          }`,
        };
      } else if (axios.isAxiosError(error) && error.request) {
        console.error("Erro na requisição:", error.request);
        return { error: "Erro na requisição. Verifique sua conexão." };
      } else {
        console.error("Erro inesperado:", error);
        return { error: "Erro inesperado ao realizar a requisição" };
      }
    }
  }

  static async detailsSchema(txName: string) {
    const params = {
      assetType: txName,
    };
    try {
      const response = await api.post("query/getSchema", params);

      switch (response.status) {
        case 200:
          return { data: response.data };

        default:
          console.error(`Erro na API: ${response.statusText}`);
          return { error: `Erro inesperado: ${response.status}` };
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Erro na resposta da API:", error.response);
        return {
          error: `Erro na API: ${error.response.status} - ${
            (error.response.data as { message?: string }).message ||
            "Erro desconhecido"
          }`,
        };
      } else if (axios.isAxiosError(error) && error.request) {
        console.error("Erro na requisição:", error.request);
        return { error: "Erro na requisição. Verifique sua conexão." };
      } else {
        console.error("Erro inesperado:", error);
        return { error: "Erro inesperado ao realizar a requisição" };
      }
    }
  }

  static async createAsset(payload: any) {

    try {
      const response = await api.post("invoke/createAsset", payload);

      switch (response.status) {
        case 200:
          return { data: response.data };

        default:
          console.error(`Erro na API: ${response.statusText}`);
          return { error: `Erro inesperado: ${response.status}` };
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Erro na resposta da API:", error.response);
        return {
          error: `Erro na API: ${error.response.status} - ${
            (error.response.data as { message?: string }).message ||
            "Erro desconhecido"
          }`,
        };
      } else if (axios.isAxiosError(error) && error.request) {
        console.error("Erro na requisição:", error.request);
        return { error: "Erro na requisição. Verifique sua conexão." };
      } else {
        console.error("Erro inesperado:", error);
        return { error: "Erro inesperado ao realizar a requisição" };
      }
    }
  }

  static async readAsset(payload: any) {
    try {
      const response = await api.post("query/readAsset", payload);

      switch (response.status) {
        case 200:
          return { data: response.data };

        default:
          console.error(`Erro na API: ${response.statusText}`);
          return { error: `Erro inesperado: ${response.status}` };
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Erro na resposta da API:", error.response);
        return {
          error: `Erro na API: ${error.response.status} - ${
            (error.response.data as { message?: string }).message ||
            "Erro desconhecido"
          }`,
        };
      } else if (axios.isAxiosError(error) && error.request) {
        console.error("Erro na requisição:", error.request);
        return { error: "Erro na requisição. Verifique sua conexão." };
      } else {
        console.error("Erro inesperado:", error);
        return { error: "Erro inesperado ao realizar a requisição" };
      }
    }
  }

  static async readAssetHistory(txName: string, name: string) {
    const params = {
      "@assetType": txName,
      name: name,
    };
    try {
      const response = await api.post("query/readAssetHistory", params);

      switch (response.status) {
        case 200:
          return { data: response.data };

        default:
          console.error(`Erro na API: ${response.statusText}`);
          return { error: `Erro inesperado: ${response.status}` };
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Erro na resposta da API:", error.response);
        return {
          error: `Erro na API: ${error.response.status} - ${
            (error.response.data as { message?: string }).message ||
            "Erro desconhecido"
          }`,
        };
      } else if (axios.isAxiosError(error) && error.request) {
        console.error("Erro na requisição:", error.request);
        return { error: "Erro na requisição. Verifique sua conexão." };
      } else {
        console.error("Erro inesperado:", error);
        return { error: "Erro inesperado ao realizar a requisição" };
      }
    }
  }

  static async searchApi(payload: any) {
    try {
      const response = await api.post("query/search", payload);
      const { result } = response.data;
      switch (response.status) {
        case 200:
          return result;

        default:
          console.error(`Erro na API: ${response.statusText}`);
          return { error: `Erro inesperado: ${response.status}` };
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Erro na resposta da API:", error.response);
        return {
          error: `Erro na API: ${error.response.status} - ${
            (error.response.data as { message?: string }).message ||
            "Erro desconhecido"
          }`,
        };
      } else if (axios.isAxiosError(error) && error.request) {
        console.error("Erro na requisição:", error.request);
        return { error: "Erro na requisição. Verifique sua conexão." };
      } else {
        console.error("Erro inesperado:", error);
        return { error: "Erro inesperado ao realizar a requisição" };
      }
    }
  }

  static async deleteApi(params: Record<string, any>) {
    try {
      const response = await api.delete("invoke/deleteAsset", {
        data: params,
      });

      switch (response.status) {
        case 200:
          return { data: response.data };

        default:
          console.error(`Erro na API: ${response.statusText}`);
          return { error: `Erro inesperado: ${response.status}` };
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Erro na resposta da API:", error.response);
        return {
          error: `Erro na API: ${error.response.status} - ${
            (error.response.data as { message?: string }).message ||
            "Erro desconhecido"
          }`,
        };
      } else if (axios.isAxiosError(error) && error.request) {
        console.error("Erro na requisição:", error.request);
        return { error: "Erro na requisição. Verifique sua conexão." };
      } else {
        console.error("Erro inesperado:", error);
        return { error: "Erro inesperado ao realizar a requisição" };
      }
    }
  }

  static async updateApi(params: Record<string, any>) {
    try {
      const response = await api.put("invoke/updateAsset", params);

      switch (response.status) {
        case 200:
          return { data: response.data };

        default:
          console.error(`Erro na API: ${response.statusText}`);
          return { error: `Erro inesperado: ${response.status}` };
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Erro na resposta da API:", error.response);
        return {
          error: `Erro na API: ${error.response.status} - ${
            (error.response.data as { message?: string }).message ||
            "Erro desconhecido"
          }`,
        };
      } else if (axios.isAxiosError(error) && error.request) {
        console.error("Erro na requisição:", error.request);
        return { error: "Erro na requisição. Verifique sua conexão." };
      } else {
        console.error("Erro inesperado:", error);
        return { error: "Erro inesperado ao realizar a requisição" };
      }
    }
  }
}
