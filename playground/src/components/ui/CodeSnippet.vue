<template>
  <section class="bg-white border-t border-slate-200 shadow">
    <!-- Header --->
    <div class="flex items-center mx-s py-[0.7rem] border-b border-slate-200">
      <h2 class="flex-1 text-s font-bold">
        Code
      </h2>
      <button
        type="button"
        :class="[
          'flex p-2xs pr-xs text-xs fill-slate-900 text-slate-700 border border-slate-200 rounded shadow',
          {
            'bg-lime-200 border-lime-400 fill-green-900 text-green-900 shadow-accent': copyState === 'success',
            'bg-pink-200 border-pink-400 fill-red-900 text-red-900 shadow-accent': copyState === 'error',
            'hover:bg-slate-100': copyState === 'default',
          }
        ]"
        @click="copyCode()"
      >
        <CopyFile v-if="copyState === 'default'" class="mt-[0.1rem] ml-[0.2rem]" />
        <Asterisk v-else-if="copyState === 'success'" class="mt-[0.1rem] ml-[0.2rem]" />
        <WarningHex v-else class="mt-[0.1rem] ml-[0.2rem]" />
        <span class="ml-2xs">{{ copyButtonLabel }}</span>
      </button>
    </div>

    <!-- Code --->
    <pre class="mt-xs mb-s px-s font-mono text-xs overflow-x-auto">{{ code }}</pre>
  </section>
</template>

<script>

import Asterisk from '@carbon/icons-vue/es/asterisk/16';
import CopyFile from '@carbon/icons-vue/es/copy--file/16';
import WarningHex from '@carbon/icons-vue/es/warning--hex/16';

export default {
  name: 'ConfigBar',

  components: {
    Asterisk,
    CopyFile,
    WarningHex,
  },

  data() {
    return {
      copyState: 'default',
    };
  },

  computed: {
    code() {
      const { axis } = this.$store.state;

      if (axis === 'all') {
        return `<div v-drag>
  drag me!
</div>`;
      }

      const axisString = axis === 'all' ? '' : `axis: '${axis}'`;

      return `<div v-drag="{ ${[axisString].join(', ')} }">
  drag me!
</div>`;
    },

    copyButtonLabel() {
      if (this.copyState === 'default') {
        return 'Copy';
      } if (this.copyState === 'success') {
        return 'Copied!';
      }

      return 'Error';
    },
  },

  methods: {
    copyCode() {
      navigator.clipboard.writeText(this.code).then(() => {
        this.copyState = 'success';

        setTimeout(() => {
          this.copyState = 'default';
        }, 2000);
      }, () => {
        this.copyState = 'errorr';

        setTimeout(() => {
          this.copyState = 'default';
        }, 2000);
      });
    },
  },
};

</script>
