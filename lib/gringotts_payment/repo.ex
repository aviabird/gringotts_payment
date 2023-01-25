defmodule GringottsPayment.Repo do
  use Ecto.Repo,
    otp_app: :gringotts_payment,
    adapter: Ecto.Adapters.Postgres
end
