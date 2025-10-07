# 💼 BankKit

## 📋 Tabla de Contenido

- [💼 BankKit](#-bankkit)
- [⚙️ Funcionalidades principales](#️-funcionalidades-principales)
- [📊 Generación de Tablas de Amortización](#-generación-de-tablas-de-amortización)
    - [✅ Ejemplo de uso](#-ejemplo-de-uso)
    - [📤 Ejemplo de salida](#-ejemplo-de-salida)
- [🧾 Generación de Matrices de Certificados Financieros](#-generación-de-matrices-de-certificados-financieros)
    - [🔧 Firma](#-firma)
    - [✅ Ejemplo de uso](#-ejemplo-de-uso-1)
    - [📤 Ejemplo de salida](#-ejemplo-de-salida-1)
- [🧾 Generación de Matrices de Certificados Financieros sin Reinversión](#-generación-de-matrices-de-certificados-financieros-sin-reinversión)
    - [🔧 Firma](#-firma-1)
    - [✅ Ejemplo de uso](#-ejemplo-de-uso-2)
    - [📤 Ejemplo de salida](#-ejemplo-de-salida-2)
- [🔢✍️ Conversión de números a letras](#️-conversión-de-números-a-letras)
    - [✅ Ejemplo de uso](#-ejemplo-de-uso-3)
    - [📤 Ejemplo de salida](#-ejemplo-de-salida-3)

---

**BankKit** es una biblioteca desarrollada en **Node.js** y **TypeScript**, diseñada para integrarse en sistemas financieros. Ofrece un conjunto modular de herramientas que permiten automatizar y simplificar operaciones bancarias comunes, tanto para usuarios finales como para ejecutivos de atención financiera.

🔐 Su objetivo principal es proporcionar una interfaz **robusta, segura y extensible** que facilite a las entidades financieras la implementación de funcionalidades recurrentes del día a día, tales como:

- 📊 Generación de **tablas de amortización**
- 🧾 Construcción de **matrices de certificados financieros**
- 🔢✍️ Conversión de **valores numéricos a texto** para documentos legales

Esto permite reducir significativamente la complejidad del desarrollo e integración de estos servicios en sus plataformas tecnológicas.

🚀 **BankKit** está orientada a acelerar la implementación de soluciones financieras, promoviendo buenas prácticas de desarrollo, tipado estricto con TypeScript, y compatibilidad con arquitecturas modernas basadas en **microservicios** o **servicios desacoplados**.

---

## ⚙️ Funcionalidades principales

- 📊 **Generación de tablas de amortización** Cálculo estructurado de pagos periódicos para préstamos u obligaciones financieras.

- 🧾 **Generación de matrices de certificados financieros** Creación automatizada de estructuras representativas de certificados financieros según criterios definidos.

- 🔢✍️ **Conversión de números a letras** Utilidad para transformar valores numéricos en su representación textual, útil en documentos legales o contractuales.

---

### 📊 Generación de Tablas de Amortización

La función `calAmortization` permite calcular la tabla de amortización de un préstamo u obligación financiera, considerando montos, tasas, plazos y comisiones. Devuelve un arreglo de objetos que representan cada período de pago, con información detallada como fecha, saldo, intereses y capital.

| Parámetro    | Tipo     | Requerido | Descripción                                                                                                                  |
| ------------ | -------- | --------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `amount`     | `number` | ✅ Sí     | Monto total del préstamo.                                                                                                    |
| `rate`       | `number` | ✅ Sí     | Tasa de interés anual (en porcentaje, no decimal).                                                                           |
| `term`       | `number` | ✅ Sí     | Número de cuotas o períodos.                                                                                                 |
| `commission` | `number` | ❌ No     | Comisión fija aplicada a cada cuota. Valor por defecto: `0`.                                                                 |
| `dateFrom`   | `Date`   | ❌ No     | Fecha desde la cual se desea iniciar el cálculo o estimación mensual de la tabla de amortización. Por defecto: `new Date()`. |

---

#### ✅ Ejemplo de uso

```ts
import { calAmortization } from 'bankkit';

const tabla = calAmortization(10000, 8, 6);
console.log(tabla);
```

#### 📤 Ejemplo de salida

```json
{
    "amount": 10000,
    "rate": 8,
    "term": 6,
    "commission": 0,
    "amortizations": [
        {
            "order": 1,
            "fee": 1705.77,
            "interest": 66.67,
            "amortization": 1639.1,
            "balance": 8360.9,
            "date": "2025-11-07T22:35:44.778Z"
        },
        {
            "order": 2,
            "fee": 1705.77,
            "interest": 55.74,
            "amortization": 1650.03,
            "balance": 6710.87,
            "date": "2025-12-07T22:35:44.778Z"
        },
        {
            "order": 3,
            "fee": 1705.77,
            "interest": 44.74,
            "amortization": 1661.03,
            "balance": 5049.84,
            "date": "2026-01-07T22:35:44.778Z"
        },
        {
            "order": 4,
            "fee": 1705.77,
            "interest": 33.67,
            "amortization": 1672.1,
            "balance": 3377.74,
            "date": "2026-02-07T22:35:44.778Z"
        },
        {
            "order": 5,
            "fee": 1705.77,
            "interest": 22.52,
            "amortization": 1683.25,
            "balance": 1694.49,
            "date": "2026-03-07T22:35:44.778Z"
        },
        {
            "order": 6,
            "fee": 1705.77,
            "interest": 11.3,
            "amortization": 1694.47,
            "balance": 0,
            "date": "2026-04-07T22:35:44.778Z"
        }
    ]
}
```

### 🧾Generación de Matrices de Certificados Financieros

La función calCertificateReinvestment permite simular o calcular la evolución de un certificado financiero con reinversión automática de intereses. El cálculo incluye la aplicación de tasas de interés, períodos definidos y deducción de impuestos gubernamentales. Es ideal para instituciones que necesitan estimar el rendimiento de inversiones a plazo fijo.

#### 🔧 Firma

```ts
calCertificateReinvestment(
  amount: number,
  rate: number,
  term: number,
  govermentTaxPercent: number,
  dateFrom = new Date()
): CertificateMatrixResult
```

| Parámetro             | Tipo   | Requerido | Descripción                                                                            |
| --------------------- | ------ | --------- | -------------------------------------------------------------------------------------- |
| `amount`              | number | ✅ Sí     | Monto inicial del certificado financiero.                                              |
| `rate`                | number | ✅ Sí     | Tasa de interés anual (en porcentaje, no decimal).                                     |
| `term`                | number | ✅ Sí     | Número de períodos (en meses) para la reinversión del certificado.                     |
| `govermentTaxPercent` | number | ✅ Sí     | Porcentaje de impuesto aplicado a los intereses generados (en porcentaje, no decimal). |
| `dateFrom`            | Date   | ❌ No     | Fecha de inicio del certificado. Valor por defecto: `new Date()`.                      |

#### ✅ Ejemplo de uso

```ts
import { calCertificateReinvestment } from 'bankkit';

const certificado = calCertificateReinvestment(10000, 8, 6, 10);
console.log(certificado);
```

#### 📤 Ejemplo de salida

```json
{
    "amount": 10000,
    "rate": 8,
    "term": 6,
    "govermentTaxPercent": 0.1,
    "date": "2025-10-07T22:48:43.673Z",
    "certificate": [
        {
            "order": 1,
            "amount": 10000,
            "interest": 66.67,
            "percenDiscount": "10%",
            "govermentDiscount": 6.67,
            "cleanInterestEarn": 60,
            "newAmount": 10060,
            "type": "Reinvestment",
            "date": "2025-11-07T22:48:43.673Z"
        },
        {
            "order": 2,
            "amount": 10060,
            "interest": 67.07,
            "percenDiscount": "10%",
            "govermentDiscount": 6.71,
            "cleanInterestEarn": 60.36,
            "newAmount": 10120.36,
            "type": "Reinvestment",
            "date": "2025-12-07T22:48:43.673Z"
        },
        {
            "order": 3,
            "amount": 10120.36,
            "interest": 67.47,
            "percenDiscount": "10%",
            "govermentDiscount": 6.75,
            "cleanInterestEarn": 60.72,
            "newAmount": 10181.08,
            "type": "Reinvestment",
            "date": "2026-01-07T22:48:43.673Z"
        },
        {
            "order": 4,
            "amount": 10181.08,
            "interest": 67.87,
            "percenDiscount": "10%",
            "govermentDiscount": 6.79,
            "cleanInterestEarn": 61.08,
            "newAmount": 10242.16,
            "type": "Reinvestment",
            "date": "2026-02-07T22:48:43.673Z"
        },
        {
            "order": 5,
            "amount": 10242.16,
            "interest": 68.28,
            "percenDiscount": "10%",
            "govermentDiscount": 6.83,
            "cleanInterestEarn": 61.45,
            "newAmount": 10303.61,
            "type": "Reinvestment",
            "date": "2026-03-07T22:48:43.673Z"
        },
        {
            "order": 6,
            "amount": 10303.61,
            "interest": 68.69,
            "percenDiscount": "10%",
            "govermentDiscount": 6.87,
            "cleanInterestEarn": 61.82,
            "newAmount": 10365.43,
            "type": "Reinvestment",
            "date": "2026-04-07T22:48:43.673Z"
        }
    ]
}
```

### 🧾 Generación de Matrices de Certificados Financieros sin Reinversión

La función calCertificateNoReinvestment permite simular o calcular la evolución de un certificado financiero sin reinversión automática de intereses. En este caso, los intereses generados en cada período se pagan o retiran, por lo que el capital permanece constante durante todo el plazo. El cálculo incluye la aplicación de tasas de interés, períodos definidos y la deducción de impuestos gubernamentales sobre los intereses generados. Esta función es ideal para instituciones o usuarios que desean estimar el rendimiento neto de inversiones a plazo fijo cuando no se reinvierten los intereses acumulados.

#### 🔧 Firma

```ts
calCertificateNoReinvestment(
  amount: number,
  rate: number,
  term: number,
  govermentTaxPercent: number,
  dateFrom = new Date()
): CertificateMatrixResult
```

| Parámetro             | Tipo   | Requerido | Descripción                                                                            |
| --------------------- | ------ | --------- | -------------------------------------------------------------------------------------- |
| `amount`              | number | ✅ Sí     | Monto inicial del certificado financiero.                                              |
| `rate`                | number | ✅ Sí     | Tasa de interés anual (en porcentaje, no decimal).                                     |
| `term`                | number | ✅ Sí     | Número de períodos (en meses) para la duración del certificado.                        |
| `govermentTaxPercent` | number | ✅ Sí     | Porcentaje de impuesto aplicado a los intereses generados (en porcentaje, no decimal). |
| `dateFrom`            | Date   | ❌ No     | Fecha de inicio del certificado. Valor por defecto: `new Date()`.                      |

#### ✅ Ejemplo de uso

```ts
import { calCertificateNoReinvestment } from 'bankkit';

const certificado = calCertificateNoReinvestment(10000, 8, 6, 10);
console.log(certificado);
```

#### 📤 Ejemplo de salida

```json
{
    "amount": 10000,
    "rate": 8,
    "term": 6,
    "govermentTaxPercent": 0.1,
    "date": "2025-10-07T22:59:04.015Z",
    "certificate": [
        {
            "order": 1,
            "amount": 10000,
            "interest": 66.67,
            "percenDiscount": "10%",
            "govermentDiscount": 6.67,
            "cleanInterestEarn": 60,
            "newAmount": 10060,
            "type": "NoReinvestment",
            "date": "2025-11-07T22:59:04.015Z"
        },
        {
            "order": 2,
            "amount": 10060,
            "interest": 66.67,
            "percenDiscount": "10%",
            "govermentDiscount": 6.67,
            "cleanInterestEarn": 60,
            "newAmount": 10120,
            "type": "NoReinvestment",
            "date": "2025-12-07T22:59:04.015Z"
        },
        {
            "order": 3,
            "amount": 10120,
            "interest": 66.67,
            "percenDiscount": "10%",
            "govermentDiscount": 6.67,
            "cleanInterestEarn": 60,
            "newAmount": 10180,
            "type": "NoReinvestment",
            "date": "2026-01-07T22:59:04.015Z"
        },
        {
            "order": 4,
            "amount": 10180,
            "interest": 66.67,
            "percenDiscount": "10%",
            "govermentDiscount": 6.67,
            "cleanInterestEarn": 60,
            "newAmount": 10240,
            "type": "NoReinvestment",
            "date": "2026-02-07T22:59:04.015Z"
        },
        {
            "order": 5,
            "amount": 10240,
            "interest": 66.67,
            "percenDiscount": "10%",
            "govermentDiscount": 6.67,
            "cleanInterestEarn": 60,
            "newAmount": 10300,
            "type": "NoReinvestment",
            "date": "2026-03-07T22:59:04.015Z"
        },
        {
            "order": 6,
            "amount": 10300,
            "interest": 66.67,
            "percenDiscount": "10%",
            "govermentDiscount": 6.67,
            "cleanInterestEarn": 60,
            "newAmount": 10360,
            "type": "NoReinvestment",
            "date": "2026-04-07T22:59:04.015Z"
        }
    ]
}
```

### 🔢✍️ Conversión de números a letras

La función convertToNumber transforma un valor numérico (o cadena numérica) en su representación textual en idioma español, ideal para documentos legales, contratos, facturas y otros documentos oficiales. La respuesta incluye diferentes formatos útiles para la presentación clara y formal de cantidades monetarias, incluyendo la parte entera, los centavos y una descripción completa.

| Parámetro | Tipo             | Requerido | Descripción                                   |
| --------- | ---------------- | --------- | --------------------------------------------- |
| `input`   | number \| string | ✅ Sí     | Valor numérico o cadena numérica a convertir. |

#### ✅ Ejemplo de uso

```ts
import { convertToNumber } from 'bankkit';

const result = convertToNumber(1225.5);
console.log(result);
```

#### 📤 Ejemplo de salida

```json
{
    "number": 1225.5,
    "letter": "MIL DOSCIENTOS VEINTICINCO PESOS DOMINICANOS CON 5/100",
    "cents": "5",
    "fullDescription": "MIL DOSCIENTOS VEINTICINCO",
    "rate": "MIL DOSCIENTOS VEINTICINCO PUNTO  CINCO"
}
```

| Campo             | Descripción                                                                                                                 |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `number`          | El valor numérico original que fue convertido.                                                                              |
| `letter`          | La representación textual completa del número, incluyendo la moneda y los centavos en formato fraccional (ej. "CON 5/100"). |
| `cents`           | Los centavos o decimales extraídos del número, en formato numérico simple.                                                  |
| `fullDescription` | La parte entera del número convertida a texto, sin incluir la moneda ni los centavos.                                       |
| `rate`            | Representación textual del número incluyendo la parte decimal expresada como "PUNTO" seguido del decimal en palabras.       |

---

📬 **Contacto**

Para nuevos requerimientos, mejoras o colaboraciones, no dudes en escribir a:  
**jessieaam0@gmail.com**
