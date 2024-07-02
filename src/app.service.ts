import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class AppService {
  private amazonServiceUrl: string;
  private mercadoLibreServiceUrl: string;

  constructor(private configService: ConfigService) {
    this.amazonServiceUrl =
      this.configService.get<string>('AMAZON_SERVICE_URL');
    this.mercadoLibreServiceUrl = this.configService.get<string>(
      'MERCADO_LIBRE_SERVICE_URL',
    );
  }

  async getAmazonPrice(productName: string): Promise<any> {
    const response = await axios.get(`${this.amazonServiceUrl}/price`, {
      params: { product: productName },
    });
    return response.data;
  }

  //Future method to fetch price from Mercado Libre Service
  async getMercadoLibrePrice(productName: string): Promise<any> {
    // Placeholder implementation
    // const response = await axios.get(`${this.mercadoLibreServiceUrl}/price`, {
    //   params: { product: productName }
    // });
    // return response.data;
    return {
      Nombre: productName,
      Descripción: 'Mocked Mercado Libre Description',
      Precio: '$22,000.00',
      Imagen: 'https://mocked-image-url.com',
      URL: 'https://mocked-url.com',
    };
  }

  // Method to compare prices
  async comparePrices(productName: string): Promise<any> {
    const amazonPrice = await this.getAmazonPrice(productName);
    const mercadoLibrePrice = await this.getMercadoLibrePrice(productName);

    return {
      amazon: amazonPrice,
      mercadoLibre: mercadoLibrePrice,
    };
  }
}
