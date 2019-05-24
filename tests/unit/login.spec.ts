import { createLocalVue, mount, shallowMount, Wrapper, BaseWrapper } from '@vue/test-utils';
import ElementUI from 'element-ui';
import { ElForm, ValidateCallback } from 'element-ui/types/form';
import Login from '@/views/Login.vue';
import VueRouter from 'vue-router';

const localVue = createLocalVue();
localVue.use(ElementUI);
localVue.use(VueRouter);

describe('Login.vue', () => {
  const router = new VueRouter();

  let wrapper: Wrapper<Login>;

  beforeEach(() => {
    wrapper = shallowMount(Login);
  });

  afterEach(() => {
    expect(wrapper.element).toMatchSnapshot();
    jest.clearAllMocks();
  });

  describe('初期化', () => {
    describe('template', () => {
      beforeEach(() => {
        wrapper = mount(Login, {
          localVue,
          router,
        });
      });

      describe('入力フィールド(ID)', () => {
        it('値が空であること', () => {
          const id = wrapper.find('.login-id input').element as HTMLInputElement;

          expect(id.value).toBe('');
        });
      });

      describe('入力フィールド(PASSWORD)', () => {
        it('値が空であること', () => {
          const password = wrapper.find('.login-password input').element as HTMLInputElement;

          expect(password.value).toBe('');
        });
      });

      describe('ログインボタン', () => {
        it('不活性であること', () => {
          const button: BaseWrapper = wrapper.find('.login-btn');

          expect(button.props('disabled')).toBe(true);
        });
      });
    });

    describe('$data', () => {
      it('プロパティ loginModel にデフォルト値を設定すること', () => {
        const expected = {
          id: '',
          password: '',
        };

        expect(wrapper.vm.$data.loginModel).toEqual(expected);
      });

      it('プロパティ validationResult に false を設定すること', () => {
        expect(wrapper.vm.$data.validationResult).toBe(false);
      });
    });
  });

  describe('lifecycle hooks', () => {
    let form: ElForm;
    let handlers: (() => void)[] | undefined;
    let mockValidate: jest.Mock<any>;

    describe('beforeUpdate', () => {
      beforeEach(() => {
        form = wrapper.vm.$refs.loginForm as ElForm;
        handlers = wrapper.vm.$options.beforeUpdate as (() => void)[] | undefined;
        mockValidate = jest.fn();
        form.validate = mockValidate;
      });

      function execBeforeUpdate() {
        if (handlers && handlers.length === 1) {
          handlers[0].call(wrapper.vm);
        } else {
          fail('lifecycle hook "beforeUpdate" should be defined.');
        }
      }

      it('コールバックを引数にフォームのバリデーションを実施すること', () => {
        execBeforeUpdate();
        expect(mockValidate).toHaveBeenCalledWith(expect.any(Function));
      });

      describe('callback', () => {
        let callback: ValidateCallback;

        beforeEach(() => {
          execBeforeUpdate();
          callback = mockValidate.mock.calls[0][0];
        });

        it('第1引数 isValid がバリデーション正常(true)ならプロパティ validationResult に true を設定すること', () => {
          wrapper.setData({ validationResult: false });

          callback(true, {});
          expect(wrapper.vm.$data.validationResult).toBe(true);
        });

        it('第1引数 isValid がバリデーションエラー(false)ならプロパティ validationResult に false を設定すること', () => {
          wrapper.setData({ validationResult: true });

          callback(false, { id: [{ message: 'required', field: 'id' }] });
          expect(wrapper.vm.$data.validationResult).toBe(false);
        });
      });
    });
  });
});
