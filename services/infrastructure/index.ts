import OpenAI from "openai";

import * as fragments from "./fragments";
import Client from "./client";

// application services
import ProductsService from "@services/application/products.service";
import PromosService from "@services/application/promos.service";
import SessionsService from "@services/application/sessions.service";

// repository implementations
import ProductsImpl from "./implementations/products.impl";
import PromosImpl from "./implementations/promos.impl";
import SessionsImpl from "./implementations/sessions.impl";

// adapters
import ProductAdapter from "./adapters/product.adapter";
import PromoAdapter from "./adapters/promo.adapter";
import PromoRewardAdapter from "./adapters/promo-reward.adapter";
import PromoActivationAdapter from "./adapters/promo-activation.adapter";

const promoRewardAdapter = new PromoRewardAdapter();
const promoActivationAdapter = new PromoActivationAdapter();
const promoAdapter = new PromoAdapter(
  promoRewardAdapter,
  promoActivationAdapter,
);
const productAdapter = new ProductAdapter(promoAdapter);

// client
const client = new Client();
const fragmentArray = Object.values(fragments);
client.setFragments(fragmentArray);

// repositories
const productsRepository = new ProductsImpl(client, productAdapter);
const promosRepository = new PromosImpl(client, promoAdapter);
const sessionsRepository = new SessionsImpl(client);

// service instances
const productsService = new ProductsService(productsRepository);
const promosService = new PromosService(promosRepository);
const sessionsService = new SessionsService(sessionsRepository);

// AI providers
const openai = new OpenAI({
  // apiKey
});

export { productsService, promosService, sessionsService, openai };
