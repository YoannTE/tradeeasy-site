#!/bin/bash
# Statusline — contexte, modèle, effort, quota 5h, Bitcoin

input=$(cat)

# --- Contexte (barre de progression) ---
used_pct=$(echo "$input" | jq -r '.context_window.used_percentage // 0')
used_int=$(printf "%.0f" "$used_pct")

bar_len=15
filled=$(( used_int * bar_len / 100 ))
if [ "$used_int" -gt 0 ] && [ "$filled" -eq 0 ]; then
  filled=1
fi
empty=$(( bar_len - filled ))

if [ "$used_int" -ge 80 ]; then
  cc='\033[0;31m'
elif [ "$used_int" -ge 50 ]; then
  cc='\033[0;33m'
else
  cc='\033[0;32m'
fi

bar=""
for ((i=0; i<filled; i++)); do bar+="█"; done
for ((i=0; i<empty; i++)); do bar+="░"; done
ctx=$(printf "${cc}${bar} %s%%\033[0m" "$used_int")

# --- Modèle ---
model=$(echo "$input" | jq -r '.model.display_name // "Claude"')

# --- Effort (depuis settings.json) ---
effort=$(jq -r '.effortLevel // empty' "$HOME/.claude/settings.json" 2>/dev/null)
if [ -n "$effort" ]; then
  case "$effort" in
    low)  ef_icon="⚡" ;;
    high) ef_icon="🧠" ;;
    *)    ef_icon="💭" ;;
  esac
  ef_info=$(printf '\033[2m%s %s\033[0m' "$ef_icon" "$effort")
else
  ef_info=""
fi

# --- Quota 5h (API OAuth, cache 60s) ---
CACHE="/tmp/claude-usage-cache"
CACHE_AGE=60

get_token() {
  local creds token
  creds=$(security find-generic-password -s "Claude Code-credentials" -w 2>/dev/null) && \
  token=$(echo "$creds" | jq -r '.claudeAiOauth.accessToken // empty' 2>/dev/null) && \
  [ -n "$token" ] && { echo "$token"; return; }
  token=$(jq -r '.claudeAiOauth.accessToken // empty' "$HOME/.claude/.credentials.json" 2>/dev/null)
  [ -n "$token" ] && echo "$token"
}

if [ ! -f "$CACHE" ] || [ $(($(date +%s) - $(stat -f %m "$CACHE" 2>/dev/null || echo 0))) -gt $CACHE_AGE ]; then
  token=$(get_token)
  if [ -n "$token" ]; then
    data=$(curl -s --max-time 3 \
      -H "Authorization: Bearer $token" \
      -H "anthropic-beta: oauth-2025-04-20" \
      -H "Content-Type: application/json" \
      https://api.anthropic.com/api/oauth/usage 2>/dev/null)
    if [ -n "$data" ] && echo "$data" | jq -e '.five_hour' >/dev/null 2>&1; then
      echo "$data" > "$CACHE"
    fi
  fi
fi

five_info=""
if [ -f "$CACHE" ]; then
  five_pct=$(jq -r '.five_hour.utilization // empty' "$CACHE" 2>/dev/null)
  if [ -n "$five_pct" ]; then
    five_int=$(printf "%.0f" "$five_pct")
    five_bar_len=15
    five_filled=$(( five_int * five_bar_len / 100 ))
    if [ "$five_int" -gt 0 ] && [ "$five_filled" -eq 0 ]; then
      five_filled=1
    fi
    five_empty=$(( five_bar_len - five_filled ))
    five_bar=""
    for ((i=0; i<five_filled; i++)); do five_bar+="█"; done
    for ((i=0; i<five_empty; i++)); do five_bar+="░"; done
    five_info=$(printf '\033[0;34m5h %s %s%%\033[0m' "$five_bar" "$five_int")
  fi
fi

# --- Bitcoin (cache 5 min) ---
BTC_CACHE="/tmp/claude-btc-cache"
BTC_AGE=300

if [ ! -f "$BTC_CACHE" ] || [ $(($(date +%s) - $(stat -f %m "$BTC_CACHE" 2>/dev/null || echo 0))) -gt $BTC_AGE ]; then
  btc_data=$(curl -s --max-time 3 "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd" 2>/dev/null)
  if [ -n "$btc_data" ] && echo "$btc_data" | jq -e '.bitcoin.usd' >/dev/null 2>&1; then
    echo "$btc_data" > "$BTC_CACHE"
  fi
fi

btc_info=""
if [ -f "$BTC_CACHE" ]; then
  btc_price=$(jq -r '.bitcoin.usd // empty' "$BTC_CACHE" 2>/dev/null)
  if [ -n "$btc_price" ]; then
    btc_fmt=$(printf "%.0f" "$btc_price")
    btc_info=$(printf '\033[0;33m₿ $%s\033[0m' "$(echo "$btc_fmt" | sed 's/\([0-9]\)\([0-9]\{3\}\)$/\1,\2/')")
  fi
fi

# --- Météo Île Maurice (cache 15 min) ---
METEO_CACHE="/tmp/claude-meteo-cache"
METEO_AGE=900

if [ ! -f "$METEO_CACHE" ] || [ $(($(date +%s) - $(stat -f %m "$METEO_CACHE" 2>/dev/null || echo 0))) -gt $METEO_AGE ]; then
  meteo_data=$(curl -s --max-time 3 "https://wttr.in/Mauritius?format=j1" 2>/dev/null)
  if [ -n "$meteo_data" ] && echo "$meteo_data" | jq -e '.current_condition[0]' >/dev/null 2>&1; then
    echo "$meteo_data" > "$METEO_CACHE"
  fi
fi

meteo_info=""
if [ -f "$METEO_CACHE" ]; then
  temp=$(jq -r '.current_condition[0].temp_C // empty' "$METEO_CACHE" 2>/dev/null)
  humidity=$(jq -r '.current_condition[0].humidity // empty' "$METEO_CACHE" 2>/dev/null)
  if [ -n "$temp" ] && [ -n "$humidity" ]; then
    meteo_info=$(printf '\033[0;36m🌴 %s°C 💧%s%%\033[0m' "$temp" "$humidity")
  fi
fi

# --- Assemblage : modèle, effort, barres, bitcoin, météo ---
printf '\033[2m%s\033[0m  %s  %b' "$model" "$ef_info" "$ctx"
[ -n "$five_info" ] && printf '  %b' "$five_info"
[ -n "$btc_info" ] && printf '  %b' "$btc_info"
[ -n "$meteo_info" ] && printf '  %b' "$meteo_info"
