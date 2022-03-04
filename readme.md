# Приложение для отслеживания курьеров.

## Микросервисная архитектура.

![image](https://i.ibb.co/QkNsRgM/chrome-c-Blc-Of-Gzsq.png)

### Перемещение курьеров эмулируется.

#### С использованием: nestjs, kafka, grpc, websocket, postgresql, docker, docker-compose.

<hr>

## Для теста нужно запустить docker-compose up, затем в браузере перейти на http://localhost:666 (основной клиент, отвечает за отслеживание курьеров и создание заказов) и второй вкладкой открыть http://localhost:777 ( отвечает за эмуляцию движения курьеров по карте)

<hr>

## Над приложением работали:

### [Я](https://github.com/ajiways) в роли "лида", "системного архитектора"(лол) и разработчика ws-gateway'я и navigation-service'a.

### [Евгений](https://github.com/Metter1) в роли разработчика клиентской части и processing-service'a

### [Сергей](https://github.com/Kirnukan) в роли разработчика rest-gateway'я и market-service'a.
