# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :gringotts_payment,
  ecto_repos: [GringottsPayment.Repo]

# Configures the endpoint
config :gringotts_payment, GringottsPaymentWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "oT7juVmRnXj+QCdIcNLAlEn4xjYYYN+yJRLaqMNUCKr2YZPbbJPbjaMpXvPyjqpF",
  render_errors: [view: GringottsPaymentWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: GringottsPayment.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Configures Gringotts Stripe Payment
config :gringotts, Gringotts.Gateways.Stripe,
adapter: Gringotts.Gateways.Stripe,
secret_key: System.get_env("SECRET_KEY"),
default_currency: "USD"
# Configures Gringotts Cams Payment
config :gringotts, Gringotts.Gateways.Cams,
adapter: Gringotts.Gateways.Cams,
username: System.get_env("CAMS_USER_ID"),
password: System.get_env("CAMS_PASSWORD"),
default_currency: "USD"

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
